'use server'
import mongoose from "mongoose";

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MongoDB URI is missing!");

// Define Schema for Rate Limiting
const requestSchema = new mongoose.Schema({
    ip: String,
    requestCount: { type: Number, default: 0 }, // Track request count
    requestDate: Date
});

const RequestLog = mongoose.models.RequestLog || mongoose.model("RequestLog", requestSchema);

// Connect to MongoDB
async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return; // Already connected
    }
    await mongoose.connect(MONGODB_URI); // No need for deprecated options anymore
}

export const getYouTubeVideoDetails = async (videoId, ipAddress) => {
    console.log("Fetching details and comments for video ID:", videoId);

    if (!videoId) {
        return { error: "Video ID is required" };
    }

    const API_KEY = process.env.YOUTUBE_API_KEY; // Ensure this is set in .env
    const YOUTUBE_VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
    const YOUTUBE_COMMENTS_URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&textFormat=plainText&maxResults=100`;

    try {
        // Connect to MongoDB
        await connectToDatabase();

        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day

        // Check if the IP exists in the database
        let requestLog = await RequestLog.findOne({
            ip: ipAddress,
            requestDate: { $gte: today } // Filter by today's date
        });

        // If no log found for the IP, create a new entry
        if (!requestLog) {
            requestLog = new RequestLog({
                ip: ipAddress,
                requestDate: today,
                requestCount: 0
            });
        }

        // Check if the request count for the day exceeds 5
        if (requestLog.requestCount >= 1) {
            console.log(`IP ${ipAddress} has exceeded the daily limit of 5 requests.`);
            return { error: "Daily limit exceeded" }, { status: 429 }; // Return 429 status for too many requests
        }

        // Increment the request count for the IP address
        requestLog.requestCount += 1;

        // Save the updated request log
        await requestLog.save();

        // Fetch video details
        const videoResponse = await fetch(YOUTUBE_VIDEO_URL);
        const videoData = await videoResponse.json();
        const videoDetails = videoData.items[0];

        // Extract video details
        const videoInfo = {
            title: videoDetails.snippet.title,
            description: videoDetails.snippet.description,
            publishedAt: videoDetails.snippet.publishedAt,
            channelTitle: videoDetails.snippet.channelTitle,
            viewCount: videoDetails.statistics.viewCount,
            likeCount: videoDetails.statistics.likeCount,
            commentCount: videoDetails.statistics.commentCount,
            thumbnail: videoDetails.snippet.thumbnails.high.url,
            videoLink: `https://www.youtube.com/watch?v=${videoId}`
        };

        // Fetch comments
        let allComments = [];
        let nextPageToken = null;

        do {
            const commentsResponse = await fetch(`${YOUTUBE_COMMENTS_URL}&pageToken=${nextPageToken || ''}`);
            const commentsData = await commentsResponse.json();

            const comments = commentsData.items?.map(item => ({
                author: item.snippet?.topLevelComment?.snippet?.authorDisplayName || "Unknown",
                text: item.snippet?.topLevelComment?.snippet?.textDisplay || "",
                likes: item.snippet?.topLevelComment?.snippet?.likeCount || 0
            })) || [];

            allComments = [...allComments, ...comments];
            nextPageToken = commentsData.nextPageToken;
        } while (nextPageToken);

        // Return the video details and comments
        return {
            videoInfo,
            comments: allComments
        };
    } catch (error) {
        console.error("Error fetching YouTube video details and comments:", error);
        return { error: "Failed to fetch video details and comments" };
    }
};
