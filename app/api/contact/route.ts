import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, organization, message } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email content
    const emailContent = `
New Contact Form Submission from Aladgold Dynamic Website

Name: ${name}
Email: ${email}
Phone: ${phone}
Organization: ${organization || "Not provided"}

Message:
${message}

---
Sent from Aladgold Dynamic Company Limited website
    `.trim()

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("[v0] RESEND_API_KEY is not set")
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly at aladgolddynamic@gmail.com" },
        { status: 500 },
      )
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Aladgold Website <onboarding@resend.dev>",
        to: ["aladgolddynamic@gmail.com"], // Updated to aladgolddynamic@gmail.com
        reply_to: email,
        subject: `New Contact Form: ${name} - ${organization || "Individual"}`,
        text: emailContent,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error("[v0] Resend API error:", errorData)
      return NextResponse.json(
        { error: "Failed to send email. Please try again or contact us directly." },
        { status: 500 },
      )
    }

    const data = await emailResponse.json()
    console.log("[v0] Email sent successfully:", data)

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json(
      { error: "An error occurred. Please try again later or contact us directly at aladgolddynamic@gmail.com" },
      { status: 500 },
    )
  }
}
