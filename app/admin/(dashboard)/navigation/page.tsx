import { createClient } from "@/utils/supabase/server"
import { NavigationClient } from "@/components/admin/navigation-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Navigation Management - Aladgold Admin",
}

export default async function AdminNavigationPage() {
    const supabase = await createClient()

    const { data: navigationItems } = await supabase
        .from('NavigationItem')
        .select('*')
        .order('order', { ascending: true })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Navigation</h1>
                    <p className="text-muted-foreground">
                        Manage header and footer navigation items.
                    </p>
                </div>
            </div>

            <NavigationClient initialData={navigationItems || []} />
        </div>
    )
}
