import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NewsletterSection } from "@/components/newsletter-section"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('NewsPost')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

    if (!post) return { title: "Post Not Found" }

    return {
        title: `${post.title} - Aladgold News`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('NewsPost')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

    if (!post || !post.published) {
        notFound()
    }

    return (
        <main className="min-h-screen">
            <Header />

            <article className="pt-32 pb-24">
                {/* Post Hero */}
                <section className="container mx-auto px-4 lg:px-6 mb-12">
                    <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-8 font-medium group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>5 min read</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 text-balance leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between py-6 border-y border-border">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold text-foreground text-sm">{post.authorName || "Aladgold Team"}</div>
                                    <div className="text-xs text-muted-foreground">Technical Writers & Experts</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share Post
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                {post.image && (
                    <section className="container mx-auto px-4 lg:px-6 mb-16">
                        <div className="max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </section>
                )}

                {/* Post Content */}
                <section className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {/* This is a simple renderer, ideally we use something like react-markdown if content is markdown */}
                            {post.content.split('\n').map((paragraph: string, idx: number) => (
                                <p key={idx} className="mb-6 text-muted-foreground leading-relaxed text-lg">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Post Footer */}
                        <div className="mt-16 pt-8 border-t border-border">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-foreground uppercase tracking-wider mr-2">Tags:</span>
                                    <Badge variant="outline" className="text-xs font-normal">#Infrastructure</Badge>
                                    <Badge variant="outline" className="text-xs font-normal">#Engineering</Badge>
                                    <Badge variant="outline" className="text-xs font-normal">#Nigeria</Badge>
                                </div>
                                <div className="flex gap-2">
                                    {/* Share Icons could go here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>

            {/* Related Posts? Could add here */}

            {/* Newsletter Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 lg:px-6">
                    <NewsletterSection />
                </div>
            </section>

            <Footer />
        </main>
    )
}
