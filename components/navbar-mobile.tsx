"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarMobileProps {
    items: { label: string; href: string }[]
}

export function NavbarMobile({ items }: NavbarMobileProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {isOpen && (
                <nav className="absolute top-20 left-0 right-0 lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="container mx-auto px-4 flex flex-col gap-4">
                        {items.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-foreground/80 hover:text-foreground py-2 border-b border-border/50"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2">
                                Get a Quote
                            </Button>
                        </Link>
                    </div>
                </nav>
            )}
        </>
    )
}
