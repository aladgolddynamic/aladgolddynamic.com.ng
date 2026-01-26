import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Briefcase, MapPin, Calendar, Clock, ArrowLeft, CheckCircle2, Users, ArrowRight, GraduationCap } from "lucide-react"
import Link from "next/link"
import { JobSection } from "@/components/job-section"
import { createClient } from "@/utils/supabase/server"

export const metadata = {
    title: "Careers - Aladgold Dynamic Company Limited",
    description:
        "Join our team of engineering and construction professionals. Explore current job opportunities and build your career with a leader in infrastructure development.",
}

export default async function CareersPage() {
    const supabase = await createClient()

    const { data: jobs } = await supabase
        .from('Job')
        .select('*')
        .eq('status', 'OPEN')
        .eq('pageSlug', 'careers')
        .order('createdAt', { ascending: false })

    const safeJobs = jobs || []

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>
                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                        <Badge className="bg-white/20 text-white border-white/30 mb-4 hover:bg-white/30 backdrop-blur-sm">Careers</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance tracking-tight">
                            Build Your Future with <span className="text-white/80">Aladgold Dynamic</span>
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
                            We're looking for passionate individuals to help us build Nigeria's future infrastructure. Join a culture of excellence, innovation, and integrity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 border-none shadow-lg hover:shadow-xl transition-shadow bg-background">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <CheckCircle2 className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Innovation First</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Work with cutting-edge engineering technologies and methodology on some of Nigeria's most challenging projects.
                            </p>
                        </Card>
                        <Card className="p-8 border-none shadow-lg hover:shadow-xl transition-shadow bg-background">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Diverse Culture</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Join a diverse team of professionals where every voice is heard and every contribution is valued.
                            </p>
                        </Card>
                        <Card className="p-8 border-none shadow-lg hover:shadow-xl transition-shadow bg-background">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <GraduationCap className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Growth & Learning</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We invest in your development through continuous training, mentorship, and clear career progression paths.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-background" id="jobs">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Current Openings</h2>
                        <p className="text-xl text-muted-foreground mb-4">
                            Find the right role for your skills and experience. We are constantly expanding our team.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm font-medium">
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            {safeJobs.length} active positions
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {safeJobs.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed rounded-3xl">
                                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                                <h3 className="text-xl font-bold mb-2">No Openings Currently</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto">
                                    While we don't have active postings right now, we're always looking for talent. Send your CV to <span className="text-primary font-medium">careers@aladgold.com</span>
                                </p>
                            </div>
                        ) : (
                            safeJobs.map((job) => (
                                <Card key={job.id} className="p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-border hover:border-primary/50 group bg-card">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 uppercase tracking-wider text-[10px] font-bold">
                                                    {job.department}
                                                </Badge>
                                                <Badge variant="outline" className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">
                                                    {job.type.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                                            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-primary/60" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-primary/60" />
                                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-primary/60" />
                                                    Immediate Start
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link href={`/careers/${job.id}`} className="w-full sm:w-auto">
                                                <Button size="lg" className="w-full sm:w-auto group/btn shadow-lg shadow-primary/20">
                                                    View Details
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
