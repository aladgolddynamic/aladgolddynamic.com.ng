import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"
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

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), "public", "uploads")
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Directory might already exist
        }

        // Generate unique filename
        const fileExtension = file.name.split(".").pop()
        const fileName = `${uuidv4()}.${fileExtension}`
        const path = join(uploadDir, fileName)

        await writeFile(path, buffer)
        const fileUrl = `/uploads/${fileName}`

        return NextResponse.json({ url: fileUrl })
    } catch (error) {
        console.error("[UPLOAD_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
