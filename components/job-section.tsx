"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Job } from "@/lib/types"

interface JobSectionProps {
    jobs: Job[]
    title?: string
    subtitle?: string
}

export function JobSection({
    jobs,
    title = "Join Our Team",
    subtitle = "We're looking for passionate individuals to help us build the future."
}: JobSectionProps) {
    if (jobs.length === 0) return null

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
                        <p className="text-muted-foreground">{subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        {jobs.map((job) => {
                            let requirements: string[] = []
                            try {
                                requirements = JSON.parse(job.requirements)
                            } catch (e) {
                                console.error("Error parsing requirements for job", job.id)
                            }

                            return (
                                <Card key={job.id} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                                                    {job.type}
                                                </Badge>
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-foreground mb-4">{job.title}</h3>
                                            <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                                                {job.description}
                                            </p>

                                            {requirements.length > 0 && (
                                                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                                                    {requirements.slice(0, 2).map((req, idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                            <span className="truncate">{req}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-3 min-w-[160px]">
                                            <Link href={`/careers/${job.id}`} className="w-full">
                                                <Button size="sm" className="w-full">
                                                    Apply Now
                                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                                </Button>
                                            </Link>
                                            <Link href="/careers" className="w-full">
                                                <Button size="sm" variant="outline" className="w-full">
                                                    All Openings
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
