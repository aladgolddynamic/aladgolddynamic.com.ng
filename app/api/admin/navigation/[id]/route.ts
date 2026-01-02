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
        const { data: navigationItem, error } = await supabase
            .from('NavigationItem')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !navigationItem) {
            return NextResponse.json({ error: "Navigation item not found" }, { status: 404 })
        }

        return NextResponse.json(navigationItem)
    } catch (error) {
        console.error("[NAVIGATION_GET]", error)
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
        const { label, href, order, parentId, type } = body

        const supabase = await createClient()

        const { id } = await params
        const { data: navigationItem, error } = await supabase
            .from('NavigationItem')
            .update({
                label,
                href,
                order,
                parentId,
                type,
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(navigationItem)
    } catch (error) {
        console.error("[NAVIGATION_PUT]", error)
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
            .from('NavigationItem')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "Navigation item deleted" })
    } catch (error) {
        console.error("[NAVIGATION_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
