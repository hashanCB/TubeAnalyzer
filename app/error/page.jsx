import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Daily Limit Exceeded</h1>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>You have exceeded the daily limit of 4 requests in the free tier.</p>
          <p>Please try again tomorrow.</p>
        </div>

        <Link href="/" className="block">
          <Button className="w-full">Go Back Home</Button>
        </Link>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        Need more requests?{" "}
        <Link href="/pricing" className="text-primary hover:underline">
          Upgrade your plan
        </Link>
      </div>
    </div>
  )
}

