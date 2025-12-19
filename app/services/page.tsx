import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Zap, Sun, Droplets, FileText, ShoppingCart, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Our Services - Aladgold Dynamic Company Limited",
  description:
    "Comprehensive engineering, construction, energy, water, consultancy and procurement services. Delivering excellence across all sectors with proven expertise.",
}

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      category: "Engineering & Construction",
      description:
        "Civil & building construction, road construction & maintenance, drainage, culverts & erosion control, structural works, dredging, land reclamation & canalization",
      color: "bg-blue-500",
      capabilities: [
        "Full-scale building construction (residential, commercial, industrial)",
        "Road construction and rehabilitation projects",
        "Drainage systems and flood control infrastructure",
        "Erosion control and land stabilization",
        "Culvert construction and bridge works",
        "Dredging operations and waterway maintenance",
        "Land reclamation and site preparation",
      ],
    },
    {
      icon: Zap,
      category: "Electrical Engineering & Systems",
      description:
        "Power installations, UPS & special power supplies, SCADA & control systems, lighting & standby power, data networks & access control",
      color: "bg-amber-500",
      capabilities: [
        "Complete power distribution system installations",
        "UPS and standby power solutions",
        "SCADA systems for industrial control",
        "Building automation and control systems",
        "Street and security lighting installations",
        "Data center and network infrastructure",
        "Access control and security systems",
      ],
    },
    {
      icon: Sun,
      category: "Solar Energy & Renewable Solutions",
      description:
        "Solar power systems, solar street lighting, centralized solar power farms, off-grid & rural electrification, energy consultancy",
      color: "bg-orange-500",
      capabilities: [
        "Residential and commercial solar installations",
        "Solar street lighting for communities and highways",
        "Large-scale solar farms for industrial use",
        "Off-grid solar solutions for remote areas",
        "Hybrid solar systems with battery backup",
        "Solar water pumping systems",
        "Energy audits and optimization consultancy",
      ],
    },
    {
      icon: Droplets,
      category: "Water Resources & Borehole Services",
      description:
        "Industrial & domestic boreholes, solar-powered boreholes, irrigation systems, water tanks & reservoirs, geophysical & hydraulic studies",
      color: "bg-cyan-500",
      capabilities: [
        "Geophysical surveys and site investigation",
        "Borehole drilling (domestic and industrial scale)",
        "Solar-powered water supply systems",
        "Water treatment and purification plants",
        "Irrigation system design and installation",
        "Water storage tanks and elevated reservoirs",
        "Hydraulic studies and groundwater assessments",
      ],
    },
    {
      icon: FileText,
      category: "Consultancy & Project Services",
      description:
        "Technical consultancy, project monitoring & evaluation, feasibility studies, environmental services, design & planning",
      color: "bg-purple-500",
      capabilities: [
        "Detailed engineering design and planning",
        "Feasibility studies and project appraisal",
        "Environmental impact assessments",
        "Project management and supervision",
        "Quality assurance and compliance monitoring",
        "Technical training and capacity building",
        "Due diligence and technical audits",
      ],
    },
    {
      icon: ShoppingCart,
      category: "Procurement & General Contracts",
      description: "Government & NGO procurement, technical & general supplies, contract execution & logistics",
      color: "bg-green-500",
      capabilities: [
        "Government tender and contract execution",
        "Technical equipment sourcing and supply",
        "General supplies for agencies and NGOs",
        "Logistics and delivery management",
        "Vendor management and quality control",
        "Import and customs clearance services",
        "Maintenance and after-sales support",
      ],
    },
  ]

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
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Our Services</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive solutions across six core service areas, delivering excellence in engineering, construction,
              energy, and infrastructure development.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="max-w-5xl mx-auto">
                <Card className="p-8 md:p-12 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-6 mb-8">
                    <div
                      className={`inline-flex items-center justify-center h-16 w-16 rounded-xl ${service.color} text-white flex-shrink-0`}
                    >
                      <service.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-3">{service.category}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">Our Capabilities:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
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

      <Footer />
    </main>
  )
}
