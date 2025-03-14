'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { getyoutubevideo } from './api/youtube'
import Sentiment from 'sentiment'

const sentimentToEmoji = {
    "Very_Positive": "😄",
    "Positive": "😊",
    "Mild_Positive": "🙂",
    "Neutral": "😐",
    "Mild_Negative": "🙁",
    "Negative": "😞",
    "Very_Negative": "😔",
}


const VideoList = ({trimvalu = ""}) => {

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
    <div>
      {!trimvalu &&  " Paste your Youtuve URL" }
      <p>{trimvalu && isfetch &&  "Data Featching from youtube........ "}</p>
      { trimvalu &&   <p> this video mood : (using { videoscom && videoscom.length} comments )  :{ finalmood} </p> }
   
    </div>
  )
}

export default VideoList