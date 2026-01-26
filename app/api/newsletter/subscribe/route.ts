import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }

        const supabase = await createClient()

        // Use upsert to handle existing emails gracefully
        const { error } = await supabase
            .from('Newsletter')
            .upsert({ email }, { onConflict: 'email' })

        if (error) throw error

        return NextResponse.json({ message: "Successfully subscribed" })
    } catch (error) {
        console.error("[NEWSLETTER_SUBSCRIBE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
