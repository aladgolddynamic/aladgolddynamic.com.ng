"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin } from "lucide-react"
import Link from "next/link"

export function ProjectsSection() {
  const [filter, setFilter] = useState("all")

  const projects = [
    {
      title: "Federal Ministry Road Infrastructure Project",
      category: "construction",
      client: "Government",
      location: "Abuja, FCT",
      status: "Completed",
      description: "Complete road construction and drainage system for federal ministry complex",
      image: "/road-construction-nigeria.jpg",
    },
    {
      title: "Solar-Powered Borehole Installation",
      category: "water",
      client: "NGO",
      location: "Kaduna State",
      status: "Completed",
      description: "Installation of 5 solar-powered boreholes for rural communities",
      image: "/solar-borehole-water.jpg",
    },
    {
      title: "State Government Electrical Systems Upgrade",
      category: "electrical",
      client: "Government",
      location: "Lagos State",
      status: "Ongoing",
      description: "Complete electrical system upgrade for state government facility",
      image: "/electrical-power-installation.jpg",
    },
    {
      title: "Agricultural Solar Farm Project",
      category: "solar",
      client: "Corporate",
      location: "Kano State",
      status: "Completed",
      description: "Centralized solar power farm for agricultural processing facility",
      image: "/solar-farm-panels.png",
    },
    {
      title: "Hospital Building Construction",
      category: "construction",
      client: "Government",
      location: "Port Harcourt",
      status: "Completed",
      description: "Full construction of 2-story hospital facility with modern amenities",
      image: "/hospital-building-construction.jpg",
    },
    {
      title: "Procurement & Supply Contract",
      category: "procurement",
      client: "Government",
      location: "Nationwide",
      status: "Completed",
      description: "Technical equipment procurement for multiple government agencies",
      image: "/procurement-supplies-equipment.jpg",
    },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "construction", label: "Construction" },
    { id: "solar", label: "Solar Energy" },
    { id: "water", label: "Water Resources" },
    { id: "electrical", label: "Electrical" },
    { id: "procurement", label: "Procurement" },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Completed Projects & Past Contracts
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Demonstrating depth, documentation, and execution strength across multiple sectors.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={filter === cat.id ? "default" : "outline"}
              onClick={() => setFilter(cat.id)}
              className="rounded-full"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">{project.status}</Badge>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Badge variant="outline">{project.client}</Badge>
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2 text-balance group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <Link href="/projects">
                  <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">
                    View Project Details →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="lg" variant="outline" className="group bg-transparent">
              View All Projects
              <Building2 className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
