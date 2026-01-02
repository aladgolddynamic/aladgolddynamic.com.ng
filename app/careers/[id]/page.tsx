import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Briefcase, CheckCircle2, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

interface JobPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function JobDetailPage({ params }: JobPageProps) {
    const { id } = await params
    const supabase = await createClient()

    const { data: job } = await supabase
        .from('Job')
        .select('*')
        .eq('id', id)
        .single()

    if (!job || job.status !== "OPEN") {
        notFound()
    }

    let requirements: string[] = []
    try {
        requirements = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements
    } catch (e) {
        console.error("Error parsing requirements for job", job.id)
    }

    return (
        <main className="min-h-screen bg-muted/30">
            <Header />

            <section className="pt-32 pb-12 bg-primary text-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <Link href="/careers" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Careers
                    </Link>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                            <Badge variant="secondary" className="bg-white/20 text-white border-none">
                                {job.type}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-sm text-white/80">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{job.title}</h1>
                        <p className="text-white/80">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
                        <div className="mt-8">
                            <Link href="/contact">
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                                    Apply for this position
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold mb-6">Job Description</h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {job.description}
                                </p>
                            </Card>

                            {requirements.length > 0 && (
                                <Card className="p-8">
                                    <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                                    <div className="space-y-4">
                                        {requirements.map((req, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-bold mb-4">Job Overview</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Job Type</p>
                                            <p className="text-sm font-medium">{job.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Location</p>
                                            <p className="text-sm font-medium">{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Date Posted</p>
                                            <p className="text-sm font-medium">{new Date(job.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link href="/contact">
                                        <Button className="w-full">Apply Now</Button>
                                    </Link>
                                </div>
                            </Card>

                            <Card className="p-6 bg-primary text-white">
                                <Mail className="h-8 w-8 mb-4 opacity-80" />
                                <h3 className="text-lg font-bold mb-2">Questions?</h3>
                                <p className="text-sm text-white/80 mb-6">
                                    Contact our HR department for more information about this role.
                                </p>
                                <Link href="/contact">
                                    <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-primary">
                                        Contact HR
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
