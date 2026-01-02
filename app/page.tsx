import { Loader } from "@/components/loader"
import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { CompanyOverview } from "@/components/company-overview"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ImpactSection } from "@/components/impact-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { ClientsSection } from "@/components/clients-section"
import { ComplianceSection } from "@/components/compliance-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { JobSection } from "@/components/job-section"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = await createClient()

  const { data: jobs } = await supabase
    .from('Job')
    .select('*')
    .eq('status', 'OPEN')
    .eq('pageSlug', 'home')
    .order('createdAt', { ascending: false })
    .limit(3)

  return (
    <>
      <Loader />
      <main className="min-h-screen">
        <Header />
        <HeroCarousel />
        <CompanyOverview />
        <ServicesSection />
        <ProjectsSection />
        <ImpactSection />
        <JobSection
          jobs={jobs || []}
          title="Featured Career Opportunities"
          subtitle="Join our world-class team and build the future of Nigerian infrastructure."
        />
        <WhyChooseSection />
        <ClientsSection />
        <ComplianceSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
