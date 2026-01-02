import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as string
                session.user.id = token.id as string
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith("/admin")
            const isLoginPath = nextUrl.pathname === "/admin/login"

            if (isOnAdmin) {
                if (isLoginPath) {
                    if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl))
                    return true
                }
                if (isLoggedIn) return true
                return false // Redirect to login page
            }
            return true
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    const { createClient } = await import("@/utils/supabase/server")
                    const supabase = await createClient()

                    const { data: user, error } = await supabase
                        .from('User')
                        .select('*')
                        .eq('email', email)
                        .maybeSingle()

                    if (error || !user) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }
                    }
                }

                return null
            },
        }),
    ],
})
