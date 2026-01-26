import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@/auth"

const DEFAULT_ID = "default"

export async function GET() {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = await createClient()

        const { data: profile, error } = await supabase
            .from('CompanyProfile')
            .select('*')
            .eq('id', DEFAULT_ID)
            .maybeSingle()

        if (error) throw error

        return NextResponse.json(profile)
    } catch (error) {
        console.error("[COMPANY_GET]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const {
            heroTitle,
            heroSubtitle,
            aboutContent,
            mission,
            vision,
            values,
            address,
            phone1,
            phone2,
            email,
            facebookUrl,
            twitterUrl,
            instagramUrl,
            linkedinUrl,
        } = body

        const supabase = await createClient()

        // Check if exists
        const { data: existing } = await supabase
            .from('CompanyProfile')
            .select('id')
            .eq('id', DEFAULT_ID)
            .maybeSingle()

        let result
        const profileData = {
            heroTitle,
            heroSubtitle,
            aboutContent,
            mission,
            vision,
            values: typeof values === 'string' ? values : JSON.stringify(values),
            address,
            phone: phone1, // Standardizing to 'phone' based on schema.prisma/SQL
            phone2,
            email,
            facebook: facebookUrl,
            twitter: twitterUrl,
            instagram: instagramUrl,
            linkedin: linkedinUrl,
        }

        if (existing) {
            const { data, error } = await supabase
                .from('CompanyProfile')
                .update(profileData)
                .eq('id', DEFAULT_ID)
                .select()
                .single()
            if (error) throw error
            result = data
        } else {
            const { data, error } = await supabase
                .from('CompanyProfile')
                .insert({ id: DEFAULT_ID, ...profileData })
                .select()
                .single()
            if (error) throw error
            result = data
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error("[COMPANY_PUT]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
