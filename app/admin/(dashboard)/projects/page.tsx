import { createClient } from "@/utils/supabase/server"
import { ProjectsClient } from "@/components/admin/projects-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Projects Management - Aladgold Admin",
}

export default async function AdminProjectsPage() {
    const supabase = await createClient()

    const { data: projects } = await supabase
        .from('Project')
        .select('*')
        .order('createdAt', { ascending: false })

    // Parse scope
    const parsedProjects = (projects || []).map(p => ({
        ...p,
        scope: typeof p.scope === 'string' ? JSON.parse(p.scope) : p.scope
    }))

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your project portfolio and featured works.
                    </p>
                </div>
            </div>

            <ProjectsClient initialData={parsedProjects} />
        </div>
    )
}
