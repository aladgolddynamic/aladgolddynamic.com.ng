import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectsSection } from "@/components/projects-section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building2, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Our Projects - Aladgold Dynamic Company Limited",
  description:
    "Explore our portfolio of successfully completed projects across engineering, construction, energy, water resources and infrastructure development.",
}

export default function ProjectsPage() {
  const featuredProjects = [
    {
      title: "Federal Ministry Road Infrastructure Development",
      category: "Construction",
      client: "Federal Government of Nigeria",
      location: "Abuja, FCT",
      year: "2023",
      budget: "₦450M",
      status: "Completed",
      description:
        "Complete road construction spanning 5.2km including drainage systems, street lighting, and pedestrian walkways for federal ministry complex.",
      scope: [
        "Road construction and asphalt overlay (5.2km)",
        "Underground drainage systems",
        "Street lighting installation",
        "Pedestrian walkways and curbs",
        "Traffic signage and road markings",
      ],
      image: "/road-construction-nigeria.jpg",
    },
    {
      title: "Rural Community Solar-Powered Water Project",
      category: "Water & Solar",
      client: "NGO Partner / Community Development",
      location: "Kaduna State",
      year: "2022",
      budget: "₦85M",
      status: "Completed",
      description:
        "Installation of 5 solar-powered boreholes with elevated storage tanks serving over 10,000 residents in rural communities.",
      scope: [
        "Geophysical survey and site analysis",
        "Borehole drilling (5 locations)",
        "Solar power system installation",
        "Elevated water tanks (50,000L each)",
        "Distribution network and taps",
      ],
      image: "/solar-borehole-water.jpg",
    },
    {
      title: "State Government Electrical Systems Upgrade",
      category: "Electrical",
      client: "Lagos State Government",
      location: "Lagos State",
      year: "2023",
      budget: "₦320M",
      status: "Ongoing",
      description:
        "Complete electrical infrastructure upgrade for state government facility including power distribution, backup systems, and building automation.",
      scope: [
        "33kV to 415V power distribution upgrade",
        "1.5MW diesel generator installation",
        "UPS and battery backup systems",
        "Building automation and control systems",
        "Energy monitoring and SCADA integration",
      ],
      image: "/electrical-power-installation.jpg",
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Our Projects</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Demonstrating depth, documentation, and execution strength across multiple sectors with over 230+
              successfully completed projects.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              Highlighting our most significant and impactful project deliveries
            </p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-64 md:h-auto bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-white">{project.status}</Badge>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline">{project.category}</Badge>
                      <Badge variant="outline">{project.year}</Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-card-foreground mb-3 text-balance">{project.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Client:</span>
                        <span className="font-medium">{project.client}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">{project.budget}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">Project Scope:</h4>
                      <ul className="space-y-2">
                        {project.scope.map((item, scopeIndex) => (
                          <li key={scopeIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection />

      <Footer />
    </main>
  )
}
