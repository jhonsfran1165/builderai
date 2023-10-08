"use client"

// Error components must be Client Components
import { useEffect } from "react"
import Image from "next/image"

import { Button } from "@builderai/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="text-4xl">Something went wrong</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/amber/app-launch.svg"
        width={400}
        height={400}
      />
      <p className="py-5 text-lg text-stone-500">{error.message}</p>

      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
