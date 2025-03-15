import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
  return (
    (<div className="min-h-screen bg-black text-white">
      <div
        className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Content Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20at%2012.41.21-08Mj9x7PjvXfjSZs2mPnZ4R3eDVwwO.png"
              alt="Morangos com Açucar"
              width={300}
              height={200}
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20at%2012.41.21-08Mj9x7PjvXfjSZs2mPnZ4R3eDVwwO.png"
              alt="Apocalypse Z"
              width={300}
              height={200}
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden col-span-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20at%2012.41.21-08Mj9x7PjvXfjSZs2mPnZ4R3eDVwwO.png"
              alt="Red One Movie"
              width={600}
              height={400}
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20at%2012.41.21-08Mj9x7PjvXfjSZs2mPnZ4R3eDVwwO.png"
              alt="Beast Games"
              width={300}
              height={200}
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20at%2012.41.21-08Mj9x7PjvXfjSZs2mPnZ4R3eDVwwO.png"
              alt="O Clube"
              width={300}
              height={200}
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden col-span-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20at%2012.41.21-08Mj9x7PjvXfjSZs2mPnZ4R3eDVwwO.png"
              alt="Culpa Tuya"
              width={600}
              height={400}
              className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right side - Call to Action */}
        <div className="space-y-6 md:pl-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Amazon Prime now available for customers in Portugal
          </h1>
          <p className="text-lg text-gray-300">
            Join Amazon Prime to watch popular movies and TV shows, including award-winning Amazon Originals. Amazon
            Prime also includes fast and free delivery on eligible items.
          </p>
          <div className="space-y-4">
            <Button className="w-full py-6 text-lg" variant="secondary">
              Prime Member? Sign in
            </Button>
            <div className="flex items-center gap-4 justify-center">
              <Separator className="w-20" />
              <span className="text-gray-400">or</span>
              <Separator className="w-20" />
            </div>
            <Button className="w-full py-6 text-lg">Start your 30-day free trial*</Button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            *€49.90/year or €4.99/month when the free trial period ends.
          </p>
        </div>
      </div>
    </div>)
  );
}

