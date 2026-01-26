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

        const { data: subscribers, error } = await supabase
            .from('Newsletter')
            .select('*')
            .order('createdAt', { ascending: false })

        if (error) throw error

        return NextResponse.json(subscribers)
    } catch (error) {
        console.error("[ADMIN_NEWSLETTER_GET]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
