import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { ProjectGrid } from "./project-grid"

export async function ProjectsSection() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('Project')
    .select('*')
    .order('createdAt', { ascending: false })

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "construction", label: "Construction" },
    { id: "solar", label: "Solar Energy" },
    { id: "water", label: "Water Resources" },
    { id: "electrical", label: "Electrical" },
    { id: "procurement", label: "Procurement" },
    { id: "data-protection", label: "Data Protection" },
    { id: "software-solutions", label: "Software Solutions" },
    { id: "consultancy", label: "Consultancy" },
  ]

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Completed Projects & Past Contracts
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Demonstrating depth, documentation, and execution strength across multiple sectors.
          </p>
        </div>

        <ProjectGrid projects={projects} categories={categories} />

        <div className="text-center mt-12">
          <Link href="/contact">
            <Button size="lg" variant="outline" className="group bg-transparent">
              Get in Touch
              <Building2 className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
