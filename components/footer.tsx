import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { Service, NavigationItem } from "@/lib/types"
import { NewsletterForm } from "./newsletter-form"

export async function Footer() {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('CompanyProfile')
    .select('*')
    .maybeSingle()

  const { data: services } = await supabase
    .from('Service')
    .select('*')
    .order('order', { ascending: true })
    .limit(6)

  const { data: navItems } = await supabase
    .from('NavigationItem')
    .select('*')
    .eq('type', 'footer')
    .order('order', { ascending: true })

  const compliance = ["FIRS Compliant", "PENCOM Registered", "ITF Compliant", "NSITF Registered", "BPP Listed"]

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Image
              src="/images/aladgold-20logo.png"
              alt="Aladgold Dynamic Company Limited"
              width={180}
              height={54}
              className="h-12 w-auto mb-4 bg-white p-2 rounded"
            />
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              {profile?.footerExcerpt || "A trusted partner in achieving business growth and sustainable development across all sectors."}
            </p>
            <div className="flex items-center gap-3 mb-6">
              {profile?.facebook && (
                <Link
                  href={profile.facebook}
                  target="_blank"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {profile?.twitter && (
                <Link
                  href={profile.twitter}
                  target="_blank"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {profile?.instagram && (
                <Link
                  href={profile.instagram}
                  target="_blank"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {profile?.linkedin && (
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
            </div>
            <NewsletterForm />
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">Engineering & Construction</Link></li>
              <li><Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">Electrical Engineering & Systems</Link></li>
              <li><Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">Solar Energy & Renewable Solutions</Link></li>
              <li><Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">Water Resources & Borehole Services</Link></li>
              <li><Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">Cloud Computing & Data Protection</Link></li>
              <li><Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">Consultancy & Project Services</Link></li>
            </ul>
          </div>

          {/* Quick Links / Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {(navItems || []).map((item: NavigationItem) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              {(!navItems || navItems.length === 0) && (
                <>
                  <li><Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/news" className="text-sm text-white/80 hover:text-white transition-colors">News</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-white/80">
              <p className="leading-relaxed">{profile?.address || "No. 69 Abidja Street, Wuse Zone 3, Abuja"}</p>
              <p>{profile?.phone || "08072653178"}</p>
              <p>{profile?.email || "aladgolddynamic@gmail.com"}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>© {new Date().getFullYear()} {profile?.name || "Aladgold Dynamic Company Limited"}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/admin/login" className="hover:text-white transition-colors">
                Admin Login
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
