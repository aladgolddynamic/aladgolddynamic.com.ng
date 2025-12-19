import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Zap, Sun, Droplets, FileText, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      icon: Building2,
      category: "Engineering & Construction",
      description:
        "Civil & building construction, road construction & maintenance, drainage, culverts & erosion control, structural works, dredging, land reclamation & canalization",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      category: "Electrical Engineering & Systems",
      description:
        "Power installations, UPS & special power supplies, SCADA & control systems, lighting & standby power, data networks & access control",
      color: "bg-amber-500",
    },
    {
      icon: Sun,
      category: "Solar Energy & Renewable Solutions",
      description:
        "Solar power systems, solar street lighting, centralized solar power farms, off-grid & rural electrification, energy consultancy",
      color: "bg-orange-500",
    },
    {
      icon: Droplets,
      category: "Water Resources & Borehole Services",
      description:
        "Industrial & domestic boreholes, solar-powered boreholes, irrigation systems, water tanks & reservoirs, geophysical & hydraulic studies",
      color: "bg-cyan-500",
    },
    {
      icon: FileText,
      category: "Consultancy & Project Services",
      description:
        "Technical consultancy, project monitoring & evaluation, feasibility studies, environmental services, design & planning",
      color: "bg-purple-500",
    },
    {
      icon: ShoppingCart,
      category: "Procurement & General Contracts",
      description: "Government & NGO procurement, technical & general supplies, contract execution & logistics",
      color: "bg-green-500",
    },
  ]

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
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div
                className={`inline-flex items-center justify-center h-14 w-14 rounded-lg ${service.color} text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3 text-balance">{service.category}</h3>
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
          ))}
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
