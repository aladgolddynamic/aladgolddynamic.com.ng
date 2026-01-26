import { createClient } from "@/utils/supabase/server"
import { ContactsClient } from "@/components/admin/contacts-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Contact Submissions - Aladgold Admin",
}

export default async function AdminContactsPage() {
    const supabase = await createClient()

    const { data: contacts } = await supabase
        .from('ContactSubmission')
        .select('*')
        .order('createdAt', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contact Submissions</h1>
                    <p className="text-muted-foreground">
                        View and manage inquiries sent through the contact form.
                    </p>
                </div>
            </div>

            <ContactsClient initialData={contacts || []} />
        </div>
    )
}
