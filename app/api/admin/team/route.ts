import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function GET() {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = await createClient()

        const { data: team, error } = await supabase
            .from('TeamMember')
            .select('*')
            .order('order', { ascending: true })

        if (error) throw error

        return NextResponse.json(team)
    } catch (error) {
        console.error("[TEAM_GET]", error)
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
        const { name, role, bio, image, order, visible, email, password } = body

        const supabase = await createClient()

        // Prepare team member data
        const data: any = {
            name,
            role,
            bio,
            image,
            order: order ?? 0,
            visible: visible ?? true,
        }

        // Handle email/login creation
        if (email && email.trim() !== "") {
            // Check if email already used in TeamMember
            const { data: existingMember } = await supabase
                .from('TeamMember')
                .select('id')
                .eq('email', email)
                .maybeSingle()

            if (existingMember) {
                return NextResponse.json({ error: "Email already assigned to another team member" }, { status: 400 })
            }

            data.email = email

            // Create User account if password provided
            if (password && password.length >= 6) {
                const { data: existingUser } = await supabase
                    .from('User')
                    .select('id')
                    .eq('email', email)
                    .maybeSingle()

                if (existingUser) {
                    return NextResponse.json({ error: "User account with this email already exists" }, { status: 400 })
                }

                const hashedPassword = await bcrypt.hash(password, 10)
                const { error: userError } = await supabase
                    .from('User')
                    .insert({
                        email,
                        name,
                        password: hashedPassword,
                        role: "ADMIN",
                    })

                if (userError) throw userError
            }
        }

        const { data: teamMember, error } = await supabase
            .from('TeamMember')
            .insert(data)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(teamMember)
    } catch (error) {
        console.error("[TEAM_POST]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
