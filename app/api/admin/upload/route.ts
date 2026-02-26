import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createBrowserClient } from "@supabase/ssr"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const fileExtension = file.name.split(".").pop()
        const fileName = `${uuidv4()}.${fileExtension}`

        const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) {
            console.error("[SUPABASE_UPLOAD_ERROR]", error)
            return NextResponse.json({ error: "Upload to storage failed" }, { status: 500 })
        }

        const { data: { publicUrl } } = supabase.storage
            .from("images")
            .getPublicUrl(fileName)

        return NextResponse.json({ url: publicUrl })
    } catch (error) {
        console.error("[UPLOAD_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
