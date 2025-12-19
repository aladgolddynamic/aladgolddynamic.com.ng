import { Shield, Award, FileCheck, Heart } from "lucide-react"

export function ComplianceSection() {
  const compliance = [
    {
      icon: Shield,
      title: "Health & Safety Standards",
      description: "Full compliance with Nigerian and international health & safety regulations",
    },
    {
      icon: Heart,
      title: "Environmental Responsibility",
      description: "Committed to sustainable practices and environmental protection",
    },
    {
      icon: Award,
      title: "Quality Management",
      description: "ISO-standard quality management systems and procedures",
    },
    {
      icon: FileCheck,
      title: "Statutory Compliance",
      description: "Fully compliant with FIRS, PENCOM, ITF, NSITF, and BPP requirements",
    },
  ]

  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Quality, Safety & Compliance</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Our commitment to excellence is backed by rigorous compliance standards and quality assurance processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {compliance.map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Our Warranties & Assurance</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">5 Years</div>
                <div className="text-sm text-white/80">Product Warranty</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">20 Years</div>
                <div className="text-sm text-white/80">Structural Warranty</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm text-white/80">Asset Integrity Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
