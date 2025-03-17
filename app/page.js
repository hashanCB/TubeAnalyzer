'use client'


import { useEffect, useState } from "react";
import YouTubeDownloader from "./youtube-downloader";



export default function Home() {

  return (
   <div className="h-screen max-w-screen" >
    {/* <Dashboard/> */}
    <YouTubeDownloader />
   </div>
  );
}
