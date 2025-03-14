'use server'

export const getyoutubevideo = async (videoId) => {
    console.log("Fetching comments for video ID:", videoId);

    if (!videoId) {
        return { error: "Video ID is required" };
    }

    const API_KEY = process.env.YOUTUBE_API_KEY; // Ensure this is set in .env
    const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&textFormat=plainText&maxResults=100`;

    try {
        let allComments = [];
        let nextPageToken = null;

        // Fetch comments in pages
        do {
            // Make the API request with the nextPageToken if it exists
            const response = await fetch(`${YOUTUBE_API_URL}&pageToken=${nextPageToken || ''}`);
            const data = await response.json();

            // Check if the response contains comment data
            const comments = data.items?.map(item => ({
                author: item.snippet?.topLevelComment?.snippet?.authorDisplayName || "Unknown",
                text: item.snippet?.topLevelComment?.snippet?.textDisplay || "",
                likes: item.snippet?.topLevelComment?.snippet?.likeCount || 0
            })) || [];

            // Add the new comments to the allComments array
            allComments = [...allComments, ...comments];

            // Get the nextPageToken if available for further pagination
            nextPageToken = data.nextPageToken;
        } while (nextPageToken); // Continue until there are no more pages of comments

        return allComments; // Return the array of all comments
    } catch (error) {
        console.error("Error fetching YouTube comments:", error);
        return { error: "Failed to fetch comments" }; // Return error if something goes wrong
    }
};
