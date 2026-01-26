import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { getIcon } from "@/lib/icon-map"
import { JobSection } from "@/components/job-section"
import { createClient } from "@/utils/supabase/server"

export const metadata = {
  title: "Our Services - Aladgold Dynamic Company Limited",
  description:
    "Comprehensive engineering, construction, energy, water, consultancy and procurement services. Delivering excellence across all sectors with proven expertise.",
}

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: services } = await supabase
    .from('Service')
    .select('*')
    .order('order', { ascending: true })

  const { data: jobs } = await supabase
    .from('Job')
    .select('*')
    .eq('status', 'OPEN')
    .eq('pageSlug', 'services')
    .order('createdAt', { ascending: false })

  const safeServices = services || []
  const safeJobs = jobs || []

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance animate-fade-in-up">Our Services</h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up animation-delay-200">
              <strong>Engineering, Energy, and Computing Solutions Built for Performance</strong><br />
              <br></br>
              Delivering compliant, scalable, and technology-enabled services across infrastructure and digital systems.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">

          {/* Engineering Services Section */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Engineering & Infrastructure</h2>
            <div className="space-y-16">
              {safeServices.filter(s => s.category === "engineering").map((service) => {
                const Icon = getIcon(service.icon)
                let capabilities: string[] = []
                try {
                  capabilities = typeof service.capabilities === 'string' ? JSON.parse(service.capabilities) : service.capabilities
                } catch (e) {
                  console.error("Error parsing capabilities for service", service.id)
                }

                return (
                  <div key={service.id} className="max-w-5xl mx-auto">
                    <Card className="p-8 md:p-12 hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-6 mb-8">
                        <div
                          className={`inline-flex items-center justify-center h-16 w-16 rounded-xl ${service.color} text-white flex-shrink-0`}
                        >
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-3">{service.title}</h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-card-foreground mb-4">Our Capabilities:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {capabilities.map((capability, capIndex) => (
                            <div key={capIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground leading-relaxed">{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Consultancy Services Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Consultancy & Project Services</h2>
            <div className="space-y-16">
              {safeServices.filter(s => s.category === "consultancy").map((service) => {
                const Icon = getIcon(service.icon)
                let capabilities: string[] = []
                try {
                  capabilities = typeof service.capabilities === 'string' ? JSON.parse(service.capabilities) : service.capabilities
                } catch (e) {
                  console.error("Error parsing capabilities for service", service.id)
                }

                return (
                  <div key={service.id} className="max-w-5xl mx-auto">
                    <Card className="p-8 md:p-12 hover:shadow-xl transition-shadow border-primary/20 bg-primary/5">
                      <div className="flex items-start gap-6 mb-8">
                        <div
                          className={`inline-flex items-center justify-center h-16 w-16 rounded-xl ${service.color} text-white flex-shrink-0`}
                        >
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-3">{service.title}</h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-card-foreground mb-4">Our Services & Expertise:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {capabilities.map((capability, capIndex) => (
                            <div key={capIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground leading-relaxed">{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/contact">
              <Button size="lg" className="group">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Jobs Section */}
      <JobSection
        jobs={safeJobs}
        title="Work With Our Experts"
        subtitle="We're looking for specialists to join our service delivery teams."
      />

      <Footer />
    </main>
  )
}
