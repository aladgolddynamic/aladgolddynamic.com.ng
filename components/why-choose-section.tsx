"use client"

import { motion } from "framer-motion"
import { Award, Clock, Target, Handshake } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Experience",
    description: "Over a decade of expertise delivering complex projects across multiple sectors",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Consistent track record of on-time, on-budget project delivery",
  },
  {
    icon: Target,
    title: "Quality",
    description: "Uncompromising standards and attention to detail in every engagement",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Long-term relationships built on trust, transparency, and mutual success",
  },
]

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Why Choose ALADGOLD DYNAMIC?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
