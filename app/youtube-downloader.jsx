'use client'
import {  Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useEffect, useState, useTransition } from 'react'
import { getyoutubevideo } from './api/youtube'
import Sentiment from 'sentiment'


import Very_Positivesvg from "./anime/smiling-face.json"; 
import Positive from "./anime/winking-face.json"; 
import Mild_Positive from "./anime/lottie.json"; 
import Neutral from "./anime/neutral.json"; 
import Mild_Negative from "./anime/slighty.json"; 
import Negative from "./anime/nagative.json"; 
import Very_Negative from "./anime/distraught.json"; 
import Image from "next/image"

const sentimentToEmoji = {
    "Very_Positive": Very_Positivesvg,
    "Positive": Positive,
    "Mild_Positive": Mild_Positive,
    "Neutral": Neutral,
    "Mild_Negative": Mild_Negative,
    "Negative": Negative,
    "Very_Negative": Very_Negative,
}






export default function YouTubeDownloader({setyulr,yurl,trimvalu}) {
    const [videoscom , setvideocom] = useState([])
    const [reaction,setReaction] = useState("")
    const [finalmood,setFinalmood] = useState()
    const [isfetch,setIsfetch] = useState(true)
    
    
    const sentimat = new Sentiment()
    
    //1st run
    useEffect(()=>{
      console.log(trimvalu)
      const getvideo = async () =>{
      const respoens = await getyoutubevideo(trimvalu)
      setvideocom(respoens)
      setIsfetch(false)
      }
       getvideo()
    },[trimvalu])
    
    //count moods
    useEffect(()=>{
      let tempvalues = {
          "Very_Positive" : 0,
           "Positive":0,
           "Mild_Positive" : 0,
           "Neutral":0,
           "Mild_Negative" : 0,
           "Negative" : 0,
           "Very_Negative":0
      }
      if (Array.isArray(videoscom))  {
      videoscom.forEach((element,index) => {
          
          const result =  sentimat.analyze(element.text)
          if (result.score >= 10) {
             
              tempvalues.Very_Positive = tempvalues.Very_Positive +1
             // console.log("Very Positive");
          } else if (result.score >= 5) {
              tempvalues.Positive = tempvalues.Positive +1
             // console.log("Positive");
          } else if (result.score >= 1) {
             // console.log("Mild Positive");
             tempvalues.Mild_Positive = tempvalues.Mild_Positive +1
          } else if (result.score === 0) {
              tempvalues.Neutral = tempvalues.Neutral +1
              //console.log("Neutral");
          } else if (result.score >= -4) {
              tempvalues.Mild_Negative = tempvalues.Mild_Negative +1
            //  console.log("Mild Negative");
          } else if (result.score >= -10) {
              tempvalues.Negative = tempvalues.Negative +1
             // console.log("Negative");
          } else {
              tempvalues.Very_Negative = tempvalues.Very_Negative +1
            //  console.log("Very Negative");
          }
          
        });
      }
    
        setReaction(tempvalues)
    },[videoscom])
    
    
    //find reaction face
    useEffect(()=>{
        const analayze = () =>{
        let convateraay = Object.entries(reaction)
        let filterarray = convateraay.sort((a,b)=>b[1] - a[1])
        let emoji = sentimentToEmoji[filterarray[0][0]]  // sentimentToEmoji
        setFinalmood(emoji)
        }
        reaction ? analayze() :[]
    },[reaction])
    
    


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center  px-4 py-12 ">

      <div className="max-w-3xl flex flex-col w-full text-center space-y-4 md:-mt-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">YouTube Video Sentiment Analysis</h1>
        <p className=" text-[#888888]">
        Analyze YouTube video comments with TubeAnalyzer! Get instant sentiment insights—positive or negative—and valuable feedback. Perfect for creators and viewers!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl ml-[10%] mt-8 ">
          <div className=" relative   flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Link2 className="h-4 w-4" />
            </div>
            <Input type="url" value={yurl} placeholder="https://www.youtube.com/watch?v=sadadasdsa" onChange={(e)=>setyulr(e.target.value)}   className="pl-9" />
          </div>
          <Button onClick={()=>setyulr("")} className="bg-red-500 hover:bg-red-600">Analyze</Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Please ensure that the files you download do not violate the rights of others. Copyrighted music cannot be
          downloaded using this tool.
        </p>

        {/* <div>
    
          <div  className=" flex items-start justify-center mx-auto w-[300px] h-[300px]" >
              {!trimvalu &&  <Lottie animationData={animationData} loop={true} /> }   
                {trimvalu && isfetch && (
                <div>
                    <Lottie animationData={animationData2} loop={true} />
                </div>
                )}
               {trimvalu && (
                    <div>
                         <p>Viewer Sentiment: {videoscom && videoscom.length} comments analyzed!</p>
                        <Lottie animationData={finalmood} loop={true} />
                    </div>
                    )}
          </div>
        </div> */}
           

           
          

        <div className="mt-8">
          <span className=" flex gap-1 items-center justify-center text-[#c2b2b2]">
          Scanned <Image src={`/images/norton.svg` } width={20} height={20} alt={"norton"}/> Norton<sup>™</sup> Safe Web
          </span>
       
        </div>

        <div className="flex flex-col md:fixed md:flex-col p-5 px-10 bottom-0 left-0 right-0 mt-8 gap-4">
          <div className=" flex flex-col md:flex md:flex-row text-justify  gap-4 ">
                <div>
                  <p className=" text-[#888888]">  Better data</p>
                  <p className=" text-[12px] text-[#888888]">
                
                  For the successful Youtubers out there, it is extremely difficult to read the
                  thousands of comments under their videos and extract the content that is so important 
                  for the existence of the channel.
                  </p>
              </div>

              <div>
                  <p className="text-[#888888]"> Easy to use</p>
                  <p className=" text-[12px] text-[#888888]">
                
                  Just paste a Youtube link and the analyser will read through all the comments for you. You get a content analysis of the comments and know at a glance what your viewers are discussing and what topics are important to them.
                  </p>
              </div>


              <div>
                  <p className="text-[#888888]"> Evaluate</p>
                  <p className=" text-[12px] text-[#888888]">
                  In addition, you will receive a sentiment analysis with which you will receive a numerical value for each comment, but also for each video, which will allow you to make comparisons.
                  Of course, there are more statistical figures for you to discover on the site.
                  </p>
              </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">© 2025 Hashanchanaka. All rights reserved.</div>

        </div>

      </div>
    </div>
  )
}

