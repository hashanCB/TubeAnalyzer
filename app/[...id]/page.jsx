'use client'
import { useParams } from 'next/navigation'
import React, { useState ,useEffect } from 'react'
import { getyoutubevideo } from '@/app/api/youtube'
import Overview from "@/app/Overview/page"
import Sentiment from 'sentiment'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Very_Positivesvg from "@/app/anime/smiling-face.json"; 
import Positive from "@/app/anime/winking-face.json"; 
import Mild_Positive from "@/app/anime/lottie.json"; 
import Neutral from "@/app/anime/neutral.json"; 
import Mild_Negative from "@/app/anime/slighty.json"; 
import Negative from "@/app/anime/nagative.json"; 
import Very_Negative from "@/app/anime/distraught.json"; 
import Lottie from 'lottie-react'


const sentimentToEmoji = {
    "Very_Positive": Very_Positivesvg,
    "Positive": Positive,
    "Mild_Positive": Mild_Positive,
    "Neutral": Neutral,
    "Mild_Negative": Mild_Negative,
    "Negative": Negative,
    "Very_Negative": Very_Negative,
}

const titles = [
  { id: 1, title: "Overview", Comp: <Overview/> },

];

const page = () => {
  const {id} = useParams()

      const [videoscom , setvideocom] = useState([])
      const [reaction,setReaction] = useState("")
      const [finalmood,setFinalmood] = useState()
      const [isfetch,setIsfetch] = useState(true)
      const [selectSection,setselectSection] = useState()
     
     //analazing part
    
     const sentimat = new Sentiment()
    
     //1st run
     useEffect(()=>{
      
       const getvideo = async () =>{
       const respoens = await getyoutubevideo(id)
       setvideocom(respoens)
       setTimeout(() => {
        setIsfetch(false)
       }, 3000);
      
       }
        getvideo()
     },[id])
     
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
    <div className='h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white   px-4 py-12"'>
    <div className=' flex gap-3 pt-4 pl-4  h-full'>
      <div>
            <div className='"'>
            <Card className="w-[350px]">
                      <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form>
                          <div className="grid  items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            
                            </div>
                            <div className="flex flex-col space-y-1.5">
                      
                          
                            </div>
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                      
                      </CardFooter>
            </Card>
            </div>
      </div>
      <div>
          <div>
                  <Card className="w-[350px]">
                      <CardHeader>
                        <CardTitle>Video Mood</CardTitle>
                      
                        <CardDescription>{ isfetch ?  "Analyzing YouTube comments to capture the vibe.." : `Insights from ${videoscom.length} comments shaping the mood.` }</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form>
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 justify-center  ">
                         


                               { isfetch && finalmood 
                                    ?     <div className="mx-auto w-full max-w-sm rounded-md border-none  p-4">
                                         <div className="flex animate-pulse space-x-4 ">
                                         <div className="size-10 rounded-full bg-gray-200"></div>
                                         <div className="flex-1 space-y-6 py-1">
                                           <div className="h-2 rounded bg-gray-200"></div>
                                           <div className="space-y-3">
                                             <div className="grid grid-cols-3 gap-4">
                                               <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                               <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                             </div>
                                             <div className="h-2 rounded bg-gray-200"></div>
                                           </div>
                                         </div>
                                       </div>
                                      </div>
                             
                                    : 

                                    <Lottie animationData={finalmood} loop={true} className=' w-[100px] h-[100px] mx-auto' /> 

                                      
                             
                                
                                }
                       
                            </div>
                            <div className="flex flex-col space-y-1.5">
                      
                          
                            </div>
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                      
                      </CardFooter>
            </Card>
          </div>
      </div>
    </div>



   
    </div>
  )
}

export default page