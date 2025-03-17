'use client'
import {  Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useEffect, useState, useTransition } from 'react'


import Image from "next/image"
import { useRouter } from "next/navigation"




export default function YouTubeDownloader() {
    //genaral code
    const [yurl,setyulr] = useState("")
   
    const [error,setError] = useState("")
    const [buttonActive,setbuttonActive] = useState(true)
    const route = useRouter()


    const useronChange = (data) => {
      let values = /^https:\/\/www\.youtube\.com\/watch\?.*$/.test(data)
      console.log(values)
      if(!values){
        setError("Oops! It seems the YouTube link you entered is invalid")
       
      }else{
       setbuttonActive(false)
       setError("")
      }
      
      setyulr(data)
    }
    const userInput = () => {
      let temptrimp = yurl.split("")
      let newarry = temptrimp.slice(temptrimp.indexOf("=")+1).join("")
      console.log(newarry)
      route.push(`/${newarry}`)
     
    }

 


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
            <Input type="url" value={yurl} placeholder="https://www.youtube.com/watch?v=" onChange={(e)=>useronChange(e.target.value)}   className="pl-9" />
          </div>
          <Button onClick={(e)=>userInput(e.target.value)}  disabled={buttonActive} className="bg-red-500 hover:bg-red-600">Analyze</Button>
        </div>
        { error !== "" ?   <p>{error}</p> : null }

        <p className="text-sm text-muted-foreground mt-4">
          Please ensure that the files you download do not violate the rights of others. Copyrighted music cannot be
          downloaded using this tool.
        </p>

           

           
          

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

