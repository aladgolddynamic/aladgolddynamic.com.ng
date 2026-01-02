import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CompanyOverview } from "@/components/company-overview"
import { ImpactSection } from "@/components/impact-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { ComplianceSection } from "@/components/compliance-section"
import { Card } from "@/components/ui/card"
import { Award, Target, Eye } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { JobSection } from "@/components/job-section"

export const metadata = {
  title: "About Us - Aladgold Dynamic Company Limited",
  description:
    "Learn about Aladgold Dynamic Company Limited - a trusted Nigerian engineering and construction firm delivering excellence since 2017.",
}

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('CompanyProfile')
    .select('*')
    .eq('id', 'default')
    .maybeSingle()

  const { data: jobs } = await supabase
    .from('Job')
    .select('*')
    .eq('status', 'OPEN')
    .eq('pageSlug', 'about')
    .order('createdAt', { ascending: false })

  const mission = profile?.mission || "To deliver world-class engineering, construction, and infrastructure solutions that drive sustainable development and exceed client expectations through innovation, quality, and integrity."
  const vision = profile?.vision || "To be the leading engineering and construction firm in Nigeria, recognized for excellence, innovation, and our contribution to national infrastructure development."
  const values = profile?.values || "Excellence, integrity, innovation, safety, and sustainability guide every project we undertake, ensuring lasting value for our clients and communities."

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance animate-fade-in-up">Who We Are</h1>
            <p className="text-xl text-white/90 leading-relaxed font-bold animate-fade-in-up animation-delay-200">
              Building the Infrastructure and Digital Intelligence That Power Sustainable Progress
            </p>
          </div>
        </div>
      </section>

      <CompanyOverview />

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 mx-auto">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mission}
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 mx-auto">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                {vision}
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 mx-auto">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                {values}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <ImpactSection />
      <WhyChooseSection />
      <ComplianceSection />

      <JobSection jobs={jobs || []} title="Join Our Team" subtitle="Be part of our mission and vision." />

      <Footer />
    </main>
  )
}

