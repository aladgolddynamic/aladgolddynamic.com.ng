import { createClient } from "@/utils/supabase/server"
import { TeamClient } from "@/components/admin/team-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Team Management - Aladgold Admin",
}

export default async function AdminTeamPage() {
    const supabase = await createClient()

    const { data: team } = await supabase
        .from('TeamMember')
        .select('*')
        .order('order', { ascending: true })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground">
                        Manage your team members and their administrative access.
                    </p>
                </div>
            </div>

            <TeamClient initialData={team || []} />
        </div>
    )
}
