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

        const { data: jobs, error } = await supabase
            .from('Job')
            .select('*')
            .order('createdAt', { ascending: false })

        if (error) throw error

        // Parse requirements if string
        const parsedJobs = jobs.map(j => ({
            ...j,
            requirements: typeof j.requirements === 'string' ? JSON.parse(j.requirements) : j.requirements
        }))

        return NextResponse.json(parsedJobs)
    } catch (error) {
        console.error("[JOBS_GET]", error)
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
        const { title, description, requirements, location, type, status, pageSlug } = body

        const supabase = await createClient()

        const { data: job, error } = await supabase
            .from('Job')
            .insert({
                title,
                description,
                requirements: JSON.stringify(requirements),
                location,
                type,
                status: status || "OPEN",
                pageSlug: pageSlug || "careers",
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(job)
    } catch (error) {
        console.error("[JOBS_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
