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

export default function Home() {
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
        <WhyChooseSection />
        <ClientsSection />
        <ComplianceSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
