"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getYouTubeVideoDetails } from "@/app/api/youtube"
import Sentiment from "sentiment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp } from "lucide-react"

import Very_Positivesvg from "@/app/anime/smiling-face.json"
import Positive from "@/app/anime/winking-face.json"
import Mild_Positive from "@/app/anime/lottie.json"
import Neutral from "@/app/anime/neutral.json"
import Mild_Negative from "@/app/anime/slighty.json"
import Negative from "@/app/anime/nagative.json"
import Very_Negative from "@/app/anime/distraught.json"
import requestIp from 'request-ip';
import Lottie from "lottie-react"
import Image from "next/image"

const sentimentToEmoji = {
  Very_Positive: Very_Positivesvg,
  Positive: Positive,
  Mild_Positive: Mild_Positive,
  Neutral: Neutral,
  Mild_Negative: Mild_Negative,
  Negative: Negative,
  Very_Negative: Very_Negative,
}

const sentimentToColor = {
  Very_Positive: "bg-green-500",
  Positive: "bg-green-400",
  Mild_Positive: "bg-green-300",
  Neutral: "bg-gray-400",
  Mild_Negative: "bg-orange-300",
  Negative: "bg-orange-400",
  Very_Negative: "bg-red-500",
}

const Page = () => {
  const { id } = useParams()
  const route = useRouter()
  const [videoscom, setVideocom] = useState([])
  const [reaction, setReaction] = useState({})
  const [finalmood, setFinalmood] = useState(null)
  const [moodName, setMoodName] = useState("")
  const [isfetch, setIsfetch] = useState(true)
  const [popultercomment, setPopultercomment] = useState([])
  const [videoDetails, setVideoDetails] = useState(null)

  //analazing part
  const sentimat = new Sentiment()

  //1st run
  useEffect(() => {
   
    const getvideo = async () => {
      try {
        const responseip = await fetch('https://api.ipify.org?format=json');
        const data = await responseip.json();
        const ipAddress = data.ip;

        const response = await getYouTubeVideoDetails(id[0],ipAddress)
        
        if (response.status === 429) {
          route.push('/error')
       
          return;
      }

        setVideocom(response.comments)
        setVideoDetails(response.videoInfo || {})

        const sortCommentBylinks = [...response.comments].sort((a, b) => b.likes - a.likes)
        setPopultercomment(sortCommentBylinks)

        setTimeout(() => {
          setIsfetch(false)
        }, 2000)
      } catch (error) {
        console.error("Error fetching video details:", error)
        setIsfetch(false)
      }
    }
    getvideo()
  }, [id])

  //count moods
  useEffect(() => {
    const tempvalues = {
      Very_Positive: 0,
      Positive: 0,
      Mild_Positive: 0,
      Neutral: 0,
      Mild_Negative: 0,
      Negative: 0,
      Very_Negative: 0,
    }

    if (Array.isArray(videoscom) && videoscom.length > 0) {
      videoscom.forEach((element) => {
        const result = sentimat.analyze(element.text)
        if (result.score >= 10) {
          tempvalues.Very_Positive = tempvalues.Very_Positive + 1
        } else if (result.score >= 5) {
          tempvalues.Positive = tempvalues.Positive + 1
        } else if (result.score >= 1) {
          tempvalues.Mild_Positive = tempvalues.Mild_Positive + 1
        } else if (result.score === 0) {
          tempvalues.Neutral = tempvalues.Neutral + 1
        } else if (result.score >= -4) {
          tempvalues.Mild_Negative = tempvalues.Mild_Negative + 1
        } else if (result.score >= -10) {
          tempvalues.Negative = tempvalues.Negative + 1
        } else {
          tempvalues.Very_Negative = tempvalues.Very_Negative + 1
        }
      })
    }

    setReaction(tempvalues)
  }, [videoscom])

  //find reaction face
  useEffect(() => {
    const analayze = () => {
      if (Object.keys(reaction).length > 0) {
        const convateraay = Object.entries(reaction)
        const filterarray = convateraay.sort((a, b) => b[1] - a[1])
        const emoji = sentimentToEmoji[filterarray[0][0]]
        setMoodName(filterarray[0][0])
        setFinalmood(emoji)
      }
    }

    if (reaction && Object.keys(reaction).length > 0) {
      analayze()
    }
  }, [reaction])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-4 md:p-8">
      {/* Video Title Section */}
      {videoDetails && (
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">{videoDetails.title || "Video Analysis"}</h1>
          <p className="text-gray-300">{videoDetails.channelTitle || "YouTube Channel"}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Video Mood Card */}
        <Card className="bg-gray-800 border-gray-700 text-white shadow-lg overflow-hidden">
          <CardHeader className="border-b border-gray-700 bg-gray-900">
            <CardTitle className="text-xl text-white">Video Mood</CardTitle>
            <CardDescription className="text-gray-400">
              {isfetch
                ? "Analyzing YouTube comments to capture the vibe..."
                : `Insights from ${videoscom.length} comments shaping the mood.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              {isfetch ? (
                <div className="w-32 h-32 rounded-full bg-gray-700 animate-pulse flex items-center justify-center">
                  <span className="text-gray-500">Loading...</span>
                </div>
              ) : (
                <>
                  <Lottie animationData={finalmood} loop={true} className="w-32 h-32 mx-auto" />
                  <Badge className={`mt-4 ${sentimentToColor[moodName] || "bg-gray-500"}`}>
                    {moodName.replace("_", " ")}
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Comment Card */}
        <Card className="bg-gray-800 border-gray-700 text-white shadow-lg overflow-hidden md:col-span-2">
          <CardHeader className="border-b border-gray-700 bg-gray-900">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl text-white">Top Comment</CardTitle>
              <Image
                src="/images/first.png"
                width={24}
                height={24}
                alt="First place badge"
                className="object-contain"
              />
            </div>
            <CardDescription className="text-gray-400">
              {isfetch ? "Finding the most engaging comment..." : `Most liked from ${videoscom.length} comments`}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isfetch || !popultercomment || popultercomment.length === 0 ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-5/6 bg-gray-700" />
                <div className="flex items-center gap-2 mt-4">
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
                  <Skeleton className="h-4 w-1/3 bg-gray-700" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-gray-100 text-lg leading-relaxed">"{popultercomment[0].text}"</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                      {popultercomment[0].author.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-300">{popultercomment[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{popultercomment[0].likes}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sentiment Distribution Card */}
        {!isfetch && (
          <Card className="bg-gray-800 border-gray-700 text-white shadow-lg overflow-hidden lg:col-span-3">
            <CardHeader className="border-b border-gray-700 bg-gray-900">
              <CardTitle className="text-xl text-white">Sentiment Distribution</CardTitle>
              <CardDescription className="text-gray-400">Breakdown of comment sentiments</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {Object.entries(reaction).map(([mood, count]) => (
                  <div key={mood} className="flex flex-col items-center">
                    <div className={`w-full h-2 ${sentimentToColor[mood] || "bg-gray-500"} rounded-full mb-2`}></div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{count}</div>
                      <div className="text-xs text-gray-400">{mood.replace("_", " ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Page

