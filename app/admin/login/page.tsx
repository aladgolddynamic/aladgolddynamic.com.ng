import { LoginForm } from "@/components/admin/login-form"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
    title: "Admin Login - Aladgold Dynamic",
}

export default function LoginPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
            <Link href="/" className="mb-8">
                <Image
                    src="/images/aladgold-logo.png"
                    alt="Aladgold Dynamic Company Limited"
                    width={240}
                    height={72}
                    className="h-16 w-auto"
                />
            </Link>
            <LoginForm />
            <p className="mt-8 text-sm text-muted-foreground">
                © {new Date().getFullYear()} Aladgold Dynamic Company Limited. All rights reserved.
            </p>
        </main>
    )
}
