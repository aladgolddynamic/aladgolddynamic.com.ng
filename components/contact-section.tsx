import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { ContactForm } from "./contact-form"

export async function ContactSection() {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('CompanyProfile')
    .select('*')
    .maybeSingle()

  const address = profile?.address || "No. 69 Abidja Street, Wuse Zone 3, Abuja"
  const phone = profile?.phone || "08072653178"
  const phone2 = "09013069506" // Additional phone if needed
  const email = profile?.email || "aladgolddynamic@gmail.com"

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Contact & Engagement</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Engage us for your next project. We're ready to deliver excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">Office Address</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">Phone Numbers</h3>
                  <p className="text-sm text-muted-foreground">{phone}</p>
                  {profile?.phone && <p className="text-sm text-muted-foreground">{phone2}</p>}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">Email Address</h3>
                  <p className="text-sm text-muted-foreground break-all">{email}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
