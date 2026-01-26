"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const clients = [
  {
    name: "Nigerian National Petroleum Corporation",
    logo: "/nnpc-logo.png",
  },
  {
    name: "Federal Ministry of Works",
    logo: "/federal-ministry-works-nigeria-logo.png",
  },
  {
    name: "Rural Electrification Agency",
    logo: "/rea-nigeria-logo.png",
  },
  {
    name: "Federal Ministry of Water Resources",
    logo: "/ministry-water-resources-nigeria-logo.png",
  },
  {
    name: "Niger Delta Development Commission",
    logo: "/nddc-logo.png",
  },
  {
    name: "Abuja Environmental Protection Board",
    logo: "/aepb-logo.png",
  },
  {
    name: "Nigerian Ports Authority",
    logo: "/npa-nigeria-logo.jpg",
  },
  {
    name: "Federal Capital Territory Administration",
    logo: "/federal ministry of special duties.jpg",
  },
]

export function ClientsSection() {
  return (
    <section id="clients" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Trusted By Leading Organizations</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            We've built long-term partnerships with government ministries, agencies, and development partners across
            Nigeria
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={200}
                height={120}
                className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl p-8 md:p-12 shadow-lg border border-border max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Long-Term Partnerships Built on Trust</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our success is measured by the lasting relationships we build with our clients. We don't just deliver
            projects—we become trusted partners in achieving business growth and sustainable development, providing
            ongoing support and expertise that extends beyond individual engagements.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
