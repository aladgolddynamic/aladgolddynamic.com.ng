"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import Link from "next/link"

import Image from "next/image"

interface ProjectGridProps {
    projects: any[]
    categories: { id: string; label: string }[]
}

export function ProjectGrid({ projects, categories }: ProjectGridProps) {
    const [filter, setFilter] = useState("all")

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase())

    return (
        <div className="space-y-12">
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
                {filteredProjects.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No projects found in this category.
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                        >
                            <div className="relative h-48 bg-muted overflow-hidden">
                                <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{project.description}</p>
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
                    ))
                )}
            </div>
        </div>
    )
}
