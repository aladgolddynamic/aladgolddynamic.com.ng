"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/construction-nigeria-infrastructure.jpg",
      subtitle: "Engineering & Construction",
      description: "Civil Construction • Road Infrastructure • Building Projects • Drainage Systems",
    },
    {
      image: "/solar-energy-renewable-power.jpg",
      subtitle: "General Contracts & Project Management",
      description: "End-to-End Project Delivery • Quality Assurance • Timeline Management • Budget Control",
    },
    {
      image: "/water-borehole-drilling-nigeria.jpg",
      subtitle: "Procurement & Supplies",
      description: "Equipment Supply • Material Sourcing • Logistics Management • Quality Products",
    },
    {
      image: "/electrical-power-systems-installation.jpg",
      subtitle: "IT Consultancy & Support",
      description: "Technology Solutions • System Integration • Technical Support • Digital Transformation",
    },
    {
      image: "/cloud-computing-data-center-servers.jpg",
      subtitle: "Cloud Computing & Data Protection",
      description: "Cloud Infrastructure • Data Security • Backup Solutions • Cybersecurity Services",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image || "/placeholder.svg?height=1080&width=1920"}
              alt={slide.subtitle}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 lg:px-6 py-32 relative z-10 h-full flex items-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance animate-fade-in-up">
                A Trusted Partner in Achieving Business Growth & Sustainable Development
              </h1>

              <h2 className="text-2xl md:text-3xl text-white/95 mb-4 font-semibold animate-fade-in-up animation-delay-100">
                {slide.subtitle}
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
                {slide.description}
              </p>

              <div className="flex items-start animate-fade-in-up animation-delay-300">
                <Button
                  onClick={scrollToServices}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-semibold group"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-12 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
