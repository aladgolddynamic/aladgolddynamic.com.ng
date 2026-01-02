import { createClient } from "@/utils/supabase/server"
import { ServicesClient } from "@/components/admin/services-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Services Management - Aladgold Admin",
}

export default async function AdminServicesPage() {
    const supabase = await createClient()

    const { data: services } = await supabase
        .from('Service')
        .select('*')
        .order('order', { ascending: true })

    // Parse capabilities
    const parsedServices = (services || []).map(s => ({
        ...s,
        capabilities: typeof s.capabilities === 'string' ? JSON.parse(s.capabilities) : s.capabilities
    }))

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                    <p className="text-muted-foreground">
                        Manage the services offered by Aladgold Dynamic Company Limited.
                    </p>
                </div>
            </div>

            <ServicesClient initialData={parsedServices} />
        </div>
    )
}
