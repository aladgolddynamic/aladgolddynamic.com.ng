import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const services = [
    "Engineering & Construction",
    "Electrical Systems",
    "Solar Energy Solutions",
    "Water Resources",
    "Consultancy Services",
    "Procurement",
  ]

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
              A trusted partner in achieving business growth and sustainable development across all sectors.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://web.facebook.com/profile.php?id=61585197586795"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/aladgolddynamic"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/aladgold_dynamic/"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compliance</h3>
            <ul className="space-y-2">
              {compliance.map((item, index) => (
                <li key={index} className="text-sm text-white/80 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-white/80">
              <p className="leading-relaxed">No. 69 Abidja Street, Wuse Zone 3, Abuja</p>
              <p>08072653178</p>
              <p>09013069506</p>
              <p className="break-all">aladgolddynamic@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>© {new Date().getFullYear()} Aladgold Dynamic Company Limited. All rights reserved.</p>
            <div className="flex items-center gap-6">
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
