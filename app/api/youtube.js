"use server";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

// Validate MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MongoDB URI is missing!");

// Define Schema for Rate Limiting
const requestSchema = new mongoose.Schema({
    ip: { type: String, required: true, index: true }, // Added index for faster queries
    requestDate: { type: Date, required: true }
});

const RequestLog = mongoose.models.RequestLog || mongoose.model("RequestLog", requestSchema);

// Database connection
async function connectToDatabase() {
    try {
        if (mongoose.connection.readyState === 1) return;
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export const getYouTubeVideoDetails = async (videoId, ipAddress) => {
    console.log(`Processing request for videoId: ${videoId}, IP: ${ipAddress}`);

    // Input validation
    if (!videoId) return { error: "Video ID is required" };
    if (!ipAddress) return { error: "IP address is required" };

    const API_KEY = process.env.YOUTUBE_API_KEY;
    if (!API_KEY) throw new Error("YouTube API key is missing!");

    const YOUTUBE_VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
    const YOUTUBE_COMMENTS_URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&textFormat=plainText&maxResults=100`;

    try {
        await connectToDatabase();

        // Define today's time range
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Check request count for this specific IP
        const requestCount = await RequestLog.countDocuments({
            ip: ipAddress,
            requestDate: { $gte: startOfDay, $lte: endOfDay }
        });

        console.log(`IP ${ipAddress} has made ${requestCount} requests today`);

        // Rate limit: 5 requests per IP per day
        if (requestCount >= 5) {
            console.log(`IP ${ipAddress} has exceeded the daily limit of 5 requests`);
            return { error: "Daily limit exceeded", status: 429 };
        }

        // Fetch video details
        const videoResponse = await fetch(YOUTUBE_VIDEO_URL);
        if (!videoResponse.ok) {
            throw new Error(`YouTube API error: ${videoResponse.statusText}`);
        }
        const videoData = await videoResponse.json();
        
        if (!videoData.items?.length) {
            return { error: "Video not found" };
        }

        const videoDetails = videoData.items[0];
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
            const url = `${YOUTUBE_COMMENTS_URL}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
            const commentsResponse = await fetch(url);
            if (!commentsResponse.ok) {
                throw new Error(`Comments API error: ${commentsResponse.statusText}`);
            }
            const commentsData = await commentsResponse.json();

            const comments = commentsData.items?.map(item => ({
                author: item.snippet?.topLevelComment?.snippet?.authorDisplayName || "Unknown",
                text: item.snippet?.topLevelComment?.snippet?.textDisplay || "",
                likes: item.snippet?.topLevelComment?.snippet?.likeCount || 0
            })) || [];

            allComments = [...allComments, ...comments];
            nextPageToken = commentsData.nextPageToken;
        } while (nextPageToken);

        // Log the request
        await RequestLog.create({
            ip: ipAddress,
            requestDate: new Date()
        });

        console.log(`Request successful for IP ${ipAddress}. Total requests today: ${requestCount + 1}`);

        return {
            videoInfo,
            comments: allComments
        };
    } catch (error) {
        console.error(`Error processing request for IP ${ipAddress}:`, error);
        return { 
            error: error.message || "Failed to fetch video details and comments",
            status: error.status || 500 
        };
    }
};

// Optional: Debug function to check request counts
export const getRequestCount = async (ipAddress) => {
    await connectToDatabase();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const count = await RequestLog.countDocuments({
        ip: ipAddress,
        requestDate: { $gte: startOfDay, $lte: endOfDay }
    });
    return { ip: ipAddress, requestCount: count };
};