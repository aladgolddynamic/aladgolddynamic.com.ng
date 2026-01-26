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

        const { data: projects, error } = await supabase
            .from('Project')
            .select('*')
            .order('createdAt', { ascending: false })

        if (error) throw error

        // Parse scope if string
        const parsedProjects = projects.map(p => ({
            ...p,
            scope: typeof p.scope === 'string' ? JSON.parse(p.scope) : p.scope
        }))

        return NextResponse.json(parsedProjects)
    } catch (error) {
        console.error("[PROJECTS_GET]", error)
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
        const { title, category, client, location, status, description, image, year, budget, scope, featured } = body

        const supabase = await createClient()

        const { data: project, error } = await supabase
            .from('Project')
            .insert({
                title,
                category,
                client,
                location,
                status: status || "ONGOING",
                description,
                image,
                year,
                budget,
                scope: scope ? JSON.stringify(scope) : null,
                featured: !!featured,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(project)
    } catch (error) {
        console.error("[PROJECTS_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
