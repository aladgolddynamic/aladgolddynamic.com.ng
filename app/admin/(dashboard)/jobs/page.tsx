import { createClient } from "@/utils/supabase/server"
import { JobsClient } from "@/components/admin/jobs-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Job Openings Management - Aladgold Admin",
}

export default async function AdminJobsPage() {
    const supabase = await createClient()

    const { data: jobs } = await supabase
        .from('Job')
        .select('*')
        .order('createdAt', { ascending: false })

    // Parse requirements
    const parsedJobs = (jobs || []).map(j => ({
        ...j,
        requirements: typeof j.requirements === 'string' ? JSON.parse(j.requirements) : j.requirements
    }))

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Openings</h1>
                    <p className="text-muted-foreground">
                        Manage career opportunities and job postings.
                    </p>
                </div>
            </div>

            <JobsClient initialData={parsedJobs} />
        </div>
    )
}
