
# **TubeAnalyzer**


**TubeAnalyzer** is a powerful tool for analyzing the sentiment of YouTube video comments. It provides insights into the emotional tone of comments, highlights the most engaging comment, and displays video details for better context. Built with modern technologies, TubeAnalyzer is perfect for creators, marketers, and researchers who want to understand audience reactions.

---

## **Features**

- **Sentiment Analysis**: Analyze YouTube comments to determine the overall mood (e.g., Very Positive, Neutral, Negative).
- **Sentiment Breakdown**: Visualize the distribution of sentiments with dynamic charts and emojis.
- **Top Comment Insights**: Discover the most engaging comment with author details and like count.
- **Video Context**: Display video title and channel information for better analysis.
- **Dynamic UI**: Enjoy a responsive and visually appealing interface.
- **Skeleton Loading States**: Smooth user experience during data fetching.
- **Error Handling**: Reliable performance with robust error handling.

---

## **Demo**

Check out the live demo of TubeAnalyzer:  
[**Live Demo Link**](https://tube-analyzer.vercel.app/)  


---

## **Screenshots**
<img width="1439" alt="Screenshot 2025-03-17 at 03 48 13" src="https://github.com/user-attachments/assets/31fdb91a-491b-46d3-bb71-52c1deed8b30" />
Analyze the sentiment of any YouTube video

<img width="1413" alt="Screenshot 2025-03-17 at 03 51 23" src="https://github.com/user-attachments/assets/9dd3f683-67d3-4757-b264-73ff6896059d" />
View the top comment and sentiment breakdown.



---

## **Technologies Used**

- **Frontend**: Next.js, Tailwind CSS, Lottie Animations
- **Backend**: YouTube Data API, Sentiment Analysis Library
- **Deployment**: Vercel/Netlify
- **Other Tools**: React, JavaScript, fetch

---

## **Getting Started**

Follow these steps to set up TubeAnalyzer locally on your machine.

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn
- YouTube Data API Key (get it from the [Google Cloud Console](https://console.cloud.google.com/))

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/TubeAnalyzer.git
   cd TubeAnalyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your YouTube Data API key:
   ```env
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:
   Visit `http://localhost:3000` to see TubeAnalyzer in action.

---

## **How It Works**

1. Enter a YouTube video ID in the input field.
2. TubeAnalyzer fetches the video details and comments using the YouTube Data API.
3. The sentiment of each comment is analyzed using the `sentiment` library.
4. The results are displayed in an easy-to-understand format, including:
   - Overall sentiment (e.g., Very Positive, Neutral, Negative).
   - Sentiment distribution chart.
   - Top comment with author and like count.
   - Video details (title and channel name).

---

## **Contributing**

Contributions are welcome! If you'd like to contribute to TubeAnalyzer, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- [YouTube Data API](https://developers.google.com/youtube/) for providing video and comment data.
- [Sentiment Library](https://www.npmjs.com/package/sentiment) for analyzing comment sentiments.
- [Lottie](https://lottiefiles.com/) for animations.
- [Tailwind CSS](https://tailwindcss.com/) for styling.


---

**TubeAnalyzer** is proudly built with ❤️ by [Hashan Chanaka]([https://github.com/your-username](https://github.com/hashanCB)).  
Let’s decode the emotional pulse of YouTube videos together! 🚀

---
