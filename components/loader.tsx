"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Loader() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Outer ring - cyan */}
        <div
          className="absolute w-40 h-40 rounded-full border-4 border-transparent border-t-[#00A8E8] animate-spin"
          style={{ animationDuration: "1.8s" }}
        ></div>

        {/* Middle ring - primary */}
        <div
          className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-primary animate-spin"
          style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
        ></div>

        {/* Inner ring - accent */}
        <div
          className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-accent animate-spin"
          style={{ animationDuration: "1.2s" }}
        ></div>

        <div className="relative z-10 w-16 h-16">
          <Image
            src="/images/untitled-20design.png"
            alt="Aladgold Dynamic Company Limited"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
