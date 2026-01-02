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
        const { data: job, error } = await supabase
            .from('Job')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 })
        }

        // Parse requirements if string
        const parsedJob = {
            ...job,
            requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements
        }

        return NextResponse.json(parsedJob)
    } catch (error) {
        console.error("[JOB_GET]", error)
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
        const { title, description, requirements, location, type, status, pageSlug } = body

        const supabase = await createClient()

        const { id } = await params
        const { data: job, error } = await supabase
            .from('Job')
            .update({
                title,
                description,
                requirements: JSON.stringify(requirements),
                location,
                type,
                status,
                pageSlug,
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(job)
    } catch (error) {
        console.error("[JOB_PUT]", error)
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
            .from('Job')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "Job deleted" })
    } catch (error) {
        console.error("[JOB_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
