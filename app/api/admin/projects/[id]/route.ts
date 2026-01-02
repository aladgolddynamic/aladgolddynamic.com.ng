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
        const { data: project, error } = await supabase
            .from('Project')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        // Parse scope if string
        const parsedProject = {
            ...project,
            scope: typeof project.scope === 'string' ? JSON.parse(project.scope) : project.scope
        }

        return NextResponse.json(parsedProject)
    } catch (error) {
        console.error("[PROJECT_GET]", error)
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
        const { title, category, client, location, status, description, image, year, budget, scope, featured } = body

        const supabase = await createClient()

        const { id } = await params
        const { data: project, error } = await supabase
            .from('Project')
            .update({
                title,
                category,
                client,
                location,
                status,
                description,
                image,
                year,
                budget,
                scope: scope ? JSON.stringify(scope) : null,
                featured: !!featured,
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(project)
    } catch (error) {
        console.error("[PROJECT_PUT]", error)
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
            .from('Project')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "Project deleted" })
    } catch (error) {
        console.error("[PROJECT_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
