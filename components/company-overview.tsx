import { CheckCircle, Award, Shield, Clock } from "lucide-react"

export function CompanyOverview() {
  const features = [
    {
      icon: CheckCircle,
      title: "Indigenous Nigerian Company",
      description: "Fully registered and compliant with all statutory requirements",
    },
    {
      icon: Award,
      title: "Multi-Disciplinary Capacity",
      description: "Comprehensive technical expertise across all service areas",
    },
    {
      icon: Shield,
      title: "Quality & Safety Focus",
      description: "Committed to international standards and best practices",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Proven track record of completing projects on schedule",
    },
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            About Aladgold Dynamic Company Limited
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            An indigenous, multi-disciplinary company delivering comprehensive solutions across engineering,
            construction, consultancy, energy, water resources, and procurement with strong compliance, technical depth,
            and proven execution capability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-muted rounded-2xl p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Commitment to Excellence</h3>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to executing projects nationwide with unwavering focus on quality, safety, and timely
              delivery. Our proven ability to work effectively with government ministries, MDAs, NGOs, corporate
              organizations, and development partners makes us a reliable and trusted choice for your projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
