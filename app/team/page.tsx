import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Users } from "lucide-react"
import { TeamMember } from "@/lib/types"
import { createClient } from "@/utils/supabase/server"

export const metadata = {
    title: "Our Team - Aladgold Dynamic Company Limited",
    description: "Meet the experts behind Aladgold Dynamic Company Limited. Our diverse team of engineers, technicians, and consultants are dedicated to excellence.",
}

export default async function TeamPage() {
    const supabase = await createClient()

    const { data: teamMembers } = await supabase
        .from('TeamMember')
        .select('*')
        .eq('visible', true)
        .order('order', { ascending: true })

    const safeTeamMembers = teamMembers || []

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>
                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance animate-fade-in-up">Our Team</h1>
                        <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up animation-delay-200">
                            Meet the dedicated professionals driving innovation and excellence at Aladgold Dynamic. Our expertise spans across engineering, construction, technology, and management.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-muted/30 border-b border-border">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">50+</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">Engineers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">20+</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">Technicians</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">15+</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">Consultants</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">10+</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-6">
                    {safeTeamMembers.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">Team profiles are currently being updated. Please check back soon.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {safeTeamMembers.map((member: TeamMember) => (
                                <Card key={member.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-80 overflow-hidden bg-muted">
                                        <img
                                            src={member.image || "/placeholder.svg?height=400&width=300"}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                            <p className="text-white/80 text-sm font-medium">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed italic">
                                            "{member.bio}"
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Join US CTA */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 lg:px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Join Our Team?</h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        We are always looking for passionate and talented individuals to help us build a better future. Explore our open positions and start your journey with us.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/careers" className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-primary shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                            View Careers
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                            Contact HR
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
