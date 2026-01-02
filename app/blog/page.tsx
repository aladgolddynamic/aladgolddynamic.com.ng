import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { NewsPost } from "@/lib/types"
import { createClient } from "@/utils/supabase/server"

import { NewsletterSection } from "@/components/newsletter-section"

export const metadata = {
  title: "Blog & Insights - Aladgold Dynamic Company Limited",
  description:
    "Latest updates, industry insights, and project highlights from Aladgold Dynamic Company Limited. Stay informed about engineering and construction trends in Nigeria.",
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('NewsPost')
    .select('*')
    .eq('published', true)
    .order('createdAt', { ascending: false })

  const safePosts = posts || []

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
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight text-balance">
              Blog & Insights
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Industry expertise, project updates, and insights from Nigeria's leading engineering and construction firm.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {safePosts.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No blog posts available at the moment. Please check back later.
              </div>
            ) : (
              safePosts.map((post: NewsPost) => (
                <Card
                  key={post.id}
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
                        <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-card-foreground mb-3 text-balance group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{post.authorName || "Aladgold Team"}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 p-0 h-auto group/btn"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Newsletter Section */}
          <div className="mt-20">
            <NewsletterSection />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
