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


const VideoList = ({trimvalu}) => {
//const [yurl,setyurl] = useState()
const [videoscom , setvideocom] = useState([])
const [ispending , startTransition] = useTransition()
const [reaction,setReaction] = useState({
    "Very_Positive" : 0,
     "Positive":0,
     "Mild_Positive" : 0,
     "Neutral":0,
     "Mild_Negative" : 0,
     "Negative" : 0,
     "Very_Negative":0



})
const [finalmood,setFinalmood] = useState()
const sentimat = new Sentiment()




useEffect(()=>{
    const analayze = () =>{
     
            let convateraay = Object.entries(reaction)
            let filterarray = convateraay.sort((a,b)=>b[1] - a[1])
            let emoji = sentimentToEmoji[filterarray[0][0]]  // sentimentToEmoji
           
             setFinalmood(emoji)
            console.log(filterarray)
        
     
       
    
    }

    analayze()
},[reaction])


useEffect(()=>{

        const getvideo = async () =>{
            const respoens = await getyoutubevideo(trimvalu)
            setvideocom(respoens)
           console.log(respoens)
        }
        getvideo()
    },[trimvalu])



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



  return (
    <div>
    
    <p> this video mood :{ finalmood} </p>
    {!finalmood && <p>Loading...</p>}
    </div>
  )
}

export default VideoList