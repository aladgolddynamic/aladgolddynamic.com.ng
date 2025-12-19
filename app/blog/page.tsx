import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"

export const metadata = {
  title: "Blog & Insights - Aladgold Dynamic Company Limited",
  description:
    "Latest updates, industry insights, and project highlights from Aladgold Dynamic Company Limited. Stay informed about engineering and construction trends in Nigeria.",
}

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of Solar Energy in Nigeria's Infrastructure Development",
      excerpt:
        "Exploring how solar energy is transforming Nigeria's infrastructure landscape and why it's becoming the preferred choice for sustainable development projects.",
      category: "Solar Energy",
      author: "Aladgold Technical Team",
      date: "December 10, 2024",
      readTime: "5 min read",
      image: "/solar-panels-nigeria-future.jpg",
      slug: "future-solar-energy-nigeria",
    },
    {
      title: "Best Practices for Borehole Drilling in Nigerian Soil Conditions",
      excerpt:
        "Understanding geological considerations and technical best practices for successful water borehole projects across different Nigerian terrain types.",
      category: "Water Resources",
      author: "Aladgold Engineering",
      date: "November 28, 2024",
      readTime: "7 min read",
      image: "/borehole-drilling-best-practices.jpg",
      slug: "borehole-drilling-best-practices",
    },
    {
      title: "Road Construction Standards: Meeting Federal Government Requirements",
      excerpt:
        "A comprehensive guide to Nigerian road construction standards, compliance requirements, and quality assurance processes for government contracts.",
      category: "Construction",
      author: "Aladgold Projects",
      date: "November 15, 2024",
      readTime: "6 min read",
      image: "/road-construction-standards-nigeria.jpg",
      slug: "road-construction-standards",
    },
    {
      title: "Electrical Safety Standards for Industrial Installations",
      excerpt:
        "Key safety protocols, regulations, and best practices for industrial electrical systems installation and maintenance in Nigeria.",
      category: "Electrical Systems",
      author: "Aladgold Technical Team",
      date: "October 30, 2024",
      readTime: "5 min read",
      image: "/electrical-safety-industrial.jpg",
      slug: "electrical-safety-standards",
    },
    {
      title: "Sustainable Development: Our Approach to Eco-Friendly Construction",
      excerpt:
        "How Aladgold Dynamic integrates environmental sustainability into every project phase, from design to execution and beyond.",
      category: "Sustainability",
      author: "Aladgold Management",
      date: "October 12, 2024",
      readTime: "4 min read",
      image: "/sustainable-construction-eco-friendly.jpg",
      slug: "sustainable-development-approach",
    },
    {
      title: "Navigating Government Procurement: A Guide for Engineering Firms",
      excerpt:
        "Essential insights into the Nigerian government procurement process, compliance requirements, and winning strategies for engineering contracts.",
      category: "Business",
      author: "Aladgold Business Development",
      date: "September 25, 2024",
      readTime: "8 min read",
      image: "/government-procurement-guide.jpg",
      slug: "government-procurement-guide",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Blog & Insights</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Industry expertise, project updates, and insights from Nigeria's leading engineering and construction
              firm.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer flex flex-col"
              >
                <div className="relative h-56 bg-muted overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">{post.category}</Badge>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3 text-balance group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 p-0 h-auto group/btn"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4">
                  Stay Updated with Our Latest Insights
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Subscribe to receive industry updates, project highlights, and expert insights directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="lg" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
