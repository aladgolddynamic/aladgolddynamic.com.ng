import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

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
        const { data: teamMember, error } = await supabase
            .from('TeamMember')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !teamMember) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 })
        }

        return NextResponse.json(teamMember)
    } catch (error) {
        console.error("[TEAM_GET]", error)
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
        const { name, role, bio, image, order, visible, email, password } = body

        const supabase = await createClient()

        const { id } = await params

        // Prepare update data
        const data: any = {
            name,
            role,
            bio,
            image,
            order,
            visible,
        }

        if (email !== undefined) {
            data.email = email === "" ? null : email
        }

        const { data: teamMember, error } = await supabase
            .from('TeamMember')
            .update(data)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        // Handle User account update/creation
        if (email && email.trim() !== "") {
            // Check if user exists
            const { data: existingUser } = await supabase
                .from('User')
                .select('*')
                .eq('email', email)
                .maybeSingle()

            const userData: any = {
                email,
                name,
                role: "ADMIN",
            }

            if (password && password.length >= 6) {
                const hashedPassword = await bcrypt.hash(password, 10)
                userData.password = hashedPassword
            }

            if (existingUser) {
                const { error: updateError } = await supabase
                    .from('User')
                    .update(userData)
                    .eq('email', email)

                if (updateError) throw updateError
            } else if (password && password.length >= 6) {
                const { error: createError } = await supabase
                    .from('User')
                    .insert(userData)

                if (createError) throw createError
            }
        }

        return NextResponse.json(teamMember)
    } catch (error) {
        console.error("[TEAM_PUT]", error)
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
            .from('TeamMember')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ message: "Team member deleted" })
    } catch (error) {
        console.error("[TEAM_DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
