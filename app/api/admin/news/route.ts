import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@/auth"

export async function GET() {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = await createClient()

        const { data: news, error } = await supabase
            .from('NewsPost')
            .select('*')
            .order('createdAt', { ascending: false })

        if (error) throw error

        return NextResponse.json(news)
    } catch (error) {
        console.error("[NEWS_GET]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { title, excerpt, content, image, published } = body

        // Simple slug generation
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")

        const supabase = await createClient()

        const { data: newsPost, error } = await supabase
            .from('NewsPost')
            .insert({
                title,
                slug,
                excerpt,
                content,
                image,
                published: published ?? false,
                publishedAt: published ? new Date().toISOString() : null,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(newsPost)
    } catch (error) {
        console.error("[NEWS_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
