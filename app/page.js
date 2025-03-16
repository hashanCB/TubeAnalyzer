'use client'


import { useEffect, useState } from "react";
import YouTubeDownloader from "./youtube-downloader";



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

    <YouTubeDownloader setyulr={setyulr} yurl={yurl}  trimvalu={trimvalu}/>
   </div>
  );
}
