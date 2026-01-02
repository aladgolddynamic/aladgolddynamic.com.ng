import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, phone, service } = body

    const supabase = await createClient()

    const { data: contact, error } = await supabase
      .from('ContactSubmission')
      .insert({
        name,
        email,
        subject,
        message,
        phone,
        service,
      })
      .select()
      .single()

    if (error) throw error

    // Send email notification if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Aladgold Contact <onboarding@resend.dev>',
          to: 'aladgolddynamic@gmail.com',
          subject: `New Contact Submission: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'General Inquiry'}\n\nMessage:\n${message}`,
        })
      } catch (emailError) {
        console.error("[SEND_EMAIL_ERROR]", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("[CONTACT_POST]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
