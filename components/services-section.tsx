import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { getIcon } from "@/lib/icon-map"

export async function ServicesSection() {
  const supabase = await createClient()

  const { data: services } = await supabase
    .from('Service')
    .select('*')
    .order('order', { ascending: true })

  // Fallback for empty DB
  const displayServices = (services && services.length > 0) ? services : []

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Core Services</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive engineering, construction, and infrastructure solutions designed to meet the highest standards
            of quality and compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => {
            const Icon = getIcon(service.icon)
            return (
              <Card
                key={service.id}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-lg ${service.color} text-white mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3 text-balance">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <Link href="/services">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-semibold group/btn"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg" variant="outline" className="group bg-transparent">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
