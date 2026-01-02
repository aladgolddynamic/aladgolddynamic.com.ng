export interface NavigationItem {
    id: string
    label: string
    href: string
    order: number
    type: string
    visible: boolean
}

export interface Service {
    id: string
    title: string
    description: string
    icon: string
    color: string
    capabilities: string // JSON string
    featured: boolean
    order: number
}

export interface Project {
    id: string
    title: string
    category: string
    client: string
    location: string
    year?: string | null
    budget?: string | null
    status: string
    description: string
    scope?: string | null // JSON string
    image?: string | null
}

export interface NewsPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image?: string | null
    category: string
    authorName?: string | null
    published: boolean
    publishedAt?: Date | null
    createdAt: Date
}

export interface TeamMember {
    id: string
    name: string
    role: string
    bio: string
    image?: string | null
    order: number
    visible: boolean
}

export interface Job {
    id: string
    title: string
    description: string
    requirements: string // JSON string
    location: string
    type: string
    status: string
    pageSlug: string
    createdAt: Date
}

export interface CompanyProfile {
    id: string
    name: string
    logo?: string | null
    email: string
    phone: string
    phone2?: string | null
    address: string
    about: string
    mission: string
    vision: string
    values: string // JSON string
    facebook?: string | null
    twitter?: string | null
    instagram?: string | null
    linkedin?: string | null
    socialLinks?: string | null // Alt: JSON string
    footerExcerpt?: string | null
}
