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

        const { data: navigation, error } = await supabase
            .from('NavigationItem')
            .select('*')
            .order('order', { ascending: true })

        if (error) throw error

        return NextResponse.json(navigation)
    } catch (error) {
        console.error("[NAVIGATION_GET]", error)
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
        const { label, href, order, parentId, type } = body

        const supabase = await createClient()

        const { data: navigationItem, error } = await supabase
            .from('NavigationItem')
            .insert({
                label,
                href,
                order: order ?? 0,
                parentId,
                type: type || "header",
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(navigationItem)
    } catch (error) {
        console.error("[NAVIGATION_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
