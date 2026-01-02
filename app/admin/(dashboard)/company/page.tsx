export const dynamic = "force-dynamic"

import { createClient } from "@/utils/supabase/server"
import { CompanyForm } from "@/components/admin/company-form"

export const metadata = {
    title: "Company Profile Management - Aladgold Admin",
}

export default async function CompanyProfilePage() {
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('CompanyProfile')
        .select('*')
        .eq('id', 'default')
        .maybeSingle()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
                    <p className="text-muted-foreground">
                        Manage your company's core information, mission, vision, and contact details.
                    </p>
                </div>
            </div>

            <CompanyForm initialData={profile} />
        </div>
    )
}
