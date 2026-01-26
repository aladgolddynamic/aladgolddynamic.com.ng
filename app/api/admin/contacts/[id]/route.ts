import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@/auth"

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { status } = body

        const supabase = await createClient()

        const { id } = await params
        const { data: contact, error } = await supabase
            .from('ContactSubmission')
            .update({ status })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(contact)
    } catch (error) {
        console.error("[CONTACT_PATCH]", error)
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
            .from('ContactSubmission')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "Submission deleted" })
    } catch (error) {
        console.error("[CONTACT_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
