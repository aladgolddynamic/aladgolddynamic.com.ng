import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectsSection } from "@/components/projects-section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building2, CheckCircle2 } from "lucide-react"
import { Project } from "@/lib/types"
import { createClient } from "@/utils/supabase/server"

export const metadata = {
  title: "Our Projects - Aladgold Dynamic Company Limited",
  description:
    "Explore our portfolio of successfully completed projects across engineering, construction, energy, water resources and infrastructure development.",
}

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: featuredProjects } = await supabase
    .from('Project')
    .select('*')
    .eq('featured', true)
    .order('createdAt', { ascending: false })

  const safeFeaturedProjects = featuredProjects || []

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance animate-fade-in-up">Our Projects</h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up animation-delay-200">
              Our portfolio spans government, corporate, and development-sector engagements, integrating physical infrastructure with modern electrical, digital, and software systems to deliver sustainable, compliant, and high-impact outcomes. Each project highlights our commitment to quality, accountability, and results-driven delivery.
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
            {safeFeaturedProjects.map((project: Project) => {
              let scope: string[] = []
              try {
                if (project.scope) {
                  scope = typeof project.scope === 'string' ? JSON.parse(project.scope) : project.scope
                }
              } catch (e) {
                console.error("Error parsing scope for project", project.id)
              }

              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative h-64 md:h-auto bg-muted">
                      {/* Explicitly ignoring next/image here for simplicity of migration, but keep standard img tags */}
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
                        {project.year && <Badge variant="outline">{project.year}</Badge>}
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
                        {project.budget && (
                          <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Budget:</span>
                            <span className="font-medium">{project.budget}</span>
                          </div>
                        )}
                      </div>

                      {scope.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-card-foreground mb-3">Project Scope:</h4>
                          <ul className="space-y-2">
                            {scope.map((item, scopeIndex) => (
                              <li key={scopeIndex} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <ProjectsSection />

      <Footer />
    </main>
  )
}

