import { ArrowRight, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function YouTubeDownloader() {
  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Free YouTube Video Downloader</h1>
        <p className="text-muted-foreground">
          The Best Free YouTube Video Downloader! Paste a YouTube URL to start downloading now—fast, no ads, and
          unlimited.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-8">
          <div className="relative flex-1">
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Link2 className="h-4 w-4" />
            </div>
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v="
              className="pl-9" />
          </div>
          <Button className="bg-red-500 hover:bg-red-600">Download</Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Please ensure that the files you download do not violate the rights of others. Copyrighted music cannot be
          downloaded using this tool.
        </p>

        <div className="mt-8">
          <Button variant="outline" className="gap-2">
            Transcribe YouTube Video Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>)
  );
}

