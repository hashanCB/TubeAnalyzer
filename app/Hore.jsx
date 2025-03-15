import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StreamingLanding() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 space-y-8">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Popcorn Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">POPCORNMOVIES</h1>
        </div>

        <p className="text-gray-400 text-center">70,000+ Movies 35,000+ TV Shows And Live Broadcasts</p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search ..."
            className="w-full bg-[#1c1f26] border-none pl-12 h-12 text-white placeholder:text-gray-400"
          />
        </div>

        <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-6 text-lg rounded-full">
          Go to Homepage
          <span className="ml-2">→</span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Popcorn Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold">PopcornMovies</span>
            </div>
            <p className="text-sm text-gray-400">
              PopcornMovies - The best place to watch movies online for free with HD quality, Free TV Shows and stream
              liv
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-gray-400 border-gray-700">
                English
              </Button>
            </div>
          </div>

          {/* Browse Section */}
          <div>
            <h3 className="font-semibold mb-4">Browse</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#">Movies</Link>
              </li>
              <li>
                <Link href="#">TV Shows</Link>
              </li>
              <li>
                <Link href="#">Trending</Link>
              </li>
              <li>
                <Link href="#">Live broadcasts</Link>
              </li>
              <li>
                <Link href="#">Actors</Link>
              </li>
              <li>
                <Link href="#">Subscription</Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#">Top IMDb</Link>
              </li>
              <li>
                <Link href="#">Collections</Link>
              </li>
              <li>
                <Link href="#">Request</Link>
              </li>
              <li>
                <Link href="#">Discord</Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Cookie Policy</Link>
              </li>
              <li>
                <Link href="#">DMCA</Link>
              </li>
              <li>
                <Link href="#">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">© 2025 PopcornMovies. All rights reserved.</div>
      </footer>
    </div>
  )
}

