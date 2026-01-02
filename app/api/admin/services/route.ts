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

        const { data: services, error } = await supabase
            .from('Service')
            .select('*')
            .order('order', { ascending: true })

        if (error) throw error

        // Parse capabilities string back to JSON if it was stored as string
        const parsedServices = services.map(s => ({
            ...s,
            capabilities: typeof s.capabilities === 'string' ? JSON.parse(s.capabilities) : s.capabilities
        }))

        return NextResponse.json(parsedServices)
    } catch (error) {
        console.error("[SERVICES_GET]", error)
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
        const { title, description, icon, color, category, capabilities, featured, order } = body

        const supabase = await createClient()

        const { data: service, error } = await supabase
            .from('Service')
            .insert({
                title,
                description,
                icon,
                color,
                category,
                capabilities: JSON.stringify(capabilities),
                featured: featured ?? false,
                order: order ?? 0,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(service)
    } catch (error) {
        console.error("[SERVICES_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
