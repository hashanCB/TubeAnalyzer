'use client'
import Image from "next/image";
import VideoList from "./VideoList";
import { useEffect, useState } from "react";


export default function Home() {
  const [yurl,setyulr] = useState("")
  const [trimvalu , settrim] = useState("")

  useEffect(()=>{
    let temptrimp = yurl.split("")
    let newarry = temptrimp.slice(temptrimp.indexOf("=")+1).join("")
    console.log(newarry)
    settrim(newarry)
  
  },[yurl])
  return (
   <div>
    <h1>Youtube video Link</h1>
    <input type="text" value={yurl} onChange={(e)=>setyulr(e.target.value)} placeholder="https://www.youtube.com/watch?v=sadadasdsa" />
    <VideoList trimvalu={trimvalu}/>
   </div>
  );
}
