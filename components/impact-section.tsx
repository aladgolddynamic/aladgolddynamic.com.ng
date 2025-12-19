"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Award, Target, CheckCircle2 } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "230+",
    label: "Projects Completed",
    desc: "Successfully delivered across various sectors",
  },
  { icon: Users, value: "50+", label: "Happy Clients", desc: "Organizations that trust our services" },
  { icon: Award, value: "8+", label: "Years of Excellence", desc: "Proven track record in the industry" },
  { icon: Target, value: "99%", label: "Client Satisfaction", desc: "Consistently exceeding expectations" },
]

const achievements = [
  "Successfully executed government and institutional projects",
  "Delivered comprehensive solutions across multiple service areas",
  "Built infrastructure projects that serve communities nationwide",
  "Maintained long-term partnerships with leading organizations",
  "Achieved consistent project delivery within timeline and budget",
  "Built a reputation for reliability and professional excellence",
]

export function ImpactSection() {
  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Impact & Track Record</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            Measurable results and lasting partnerships that demonstrate our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-2">{stat.label}</div>
                  <p className="text-sm text-muted-foreground text-balance">{stat.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl p-8 md:p-12 shadow-lg border border-border"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground/90">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
