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
        const { data: service, error } = await supabase
            .from('Service')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 })
        }

        // Parse capabilities if string
        const parsedService = {
            ...service,
            capabilities: typeof service.capabilities === 'string' ? JSON.parse(service.capabilities) : service.capabilities
        }

        return NextResponse.json(parsedService)
    } catch (error) {
        console.error("[SERVICE_GET]", error)
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
        const { title, description, icon, color, category, capabilities, featured, order } = body

        const supabase = await createClient()

        const { id } = await params
        const { data: service, error } = await supabase
            .from('Service')
            .update({
                title,
                description,
                icon,
                color,
                category,
                capabilities: JSON.stringify(capabilities),
                featured,
                order,
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(service)
    } catch (error) {
        console.error("[SERVICE_PUT]", error)
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
            .from('Service')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "Service deleted" })
    } catch (error) {
        console.error("[SERVICE_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
