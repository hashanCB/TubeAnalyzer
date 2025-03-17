'use server'

export const getYouTubeVideoDetails = async (videoId) => {
    console.log("Fetching details and comments for video ID:", videoId);

    if (!videoId) {
        return { error: "Video ID is required" };
    }

    const API_KEY = process.env.YOUTUBE_API_KEY; // Ensure this is set in .env
    const YOUTUBE_VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
    const YOUTUBE_COMMENTS_URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&textFormat=plainText&maxResults=100`;

    try {
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