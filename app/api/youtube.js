'use server'
import mongoose from "mongoose";
import { redirect } from "next/navigation";

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MongoDB URI is missing!");

// Define Schema for Rate Limiting
const requestSchema = new mongoose.Schema({
    ip: String,
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

        // Check if the IP has exceeded the daily limit (5 requests)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day

        // Count requests made by this IP for today
        const requestCount = await RequestLog.countDocuments({
            ip: ipAddress,
            requestDate: { $gte: today }
        });

        if (requestCount >= 5) {
            console.log(`IP ${ipAddress} has exceeded the daily limit of 5 requests.`);
            return { error: "Daily limit exceeded" }, { status: 429 }; // Return 429 status for too many requests
        }

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

        // Log the request in MongoDB
        await RequestLog.create({ ip: ipAddress, requestDate: new Date() });

        // Combine video details and comments
        return {
            videoInfo,
            comments: allComments
        };
    } catch (error) {
        console.error("Error fetching YouTube video details and comments:", error);
        return { error: "Failed to fetch video details and comments" };
    }
};
