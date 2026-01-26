import { auth } from "./auth"
import { updateSession } from "@/utils/supabase/middleware"
import { type NextRequest } from "next/server"

export const proxy = async (request: NextRequest) => {
    // Update Supabase session
    const response = await updateSession(request)

    // Continue with auth middleware logic
    // NextAuth beta uses the middleware export which we now call as proxy in Next.js 16
    return (auth as any)(request)
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
