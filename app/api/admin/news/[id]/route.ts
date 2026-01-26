import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@/auth"

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = await createClient()

        const { id } = await params
        const { data: newsPost, error } = await supabase
            .from('NewsPost')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !newsPost) {
            return NextResponse.json({ error: "News post not found" }, { status: 404 })
        }

        return NextResponse.json(newsPost)
    } catch (error) {
        console.error("[NEWS_GET]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
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

        const { id } = await params
        const { data: newsPost, error } = await supabase
            .from('NewsPost')
            .update({
                title,
                slug,
                excerpt,
                content,
                image,
                published,
                publishedAt: published ? new Date().toISOString() : null,
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(newsPost)
    } catch (error) {
        console.error("[NEWS_PUT]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = await createClient()

        const { id } = await params
        const { error } = await supabase
            .from('NewsPost')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "News post deleted" })
    } catch (error) {
        console.error("[NEWS_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
