import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { NavbarMobile } from "./navbar-mobile"
import { NavigationItem } from "@/lib/types"

export async function Header() {
  const supabase = await createClient()

  const { data: navigation } = await supabase
    .from('NavigationItem')
    .select('*')
    .eq('type', 'header')
    .order('order', { ascending: true })

  // Fallback if no items in DB (e.g. initial state)
  const defaultNav = [
    { id: "home-link", label: "Home", href: "/", order: 1, type: "header", visible: true },
    { id: "services-link", label: "Services", href: "/services", order: 2, type: "header", visible: true },
    { id: "projects-link", label: "Projects", href: "/projects", order: 3, type: "header", visible: true },
    { id: "news-link", label: "News", href: "/news", order: 4, type: "header", visible: true },
    { id: "careers-link", label: "Careers", href: "/careers", order: 5, type: "header", visible: true },
    { id: "about-link", label: "About", href: "/about", order: 6, type: "header", visible: true },
    { id: "contact-link", label: "Contact", href: "/contact", order: 7, type: "header", visible: true },
    { id: "admin-link", label: "Admin", href: "/admin", order: 8, type: "header", visible: true },
  ]

  const items = (navigation && navigation.length > 0)
    ? navigation.map((item: any) => ({ id: item.id, label: item.label, href: item.href }))
    : defaultNav

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/aladgold-logo.png"
              alt="Aladgold Dynamic Company Limited"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {items.map((item: any) => (
              <Link
                key={item.id || item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get a Quote
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button & Nav handled by client component */}
          <NavbarMobile items={items} />
        </div>
      </div>
    </header>
  )
}
