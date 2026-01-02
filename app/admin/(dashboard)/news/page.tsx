import { createClient } from "@/utils/supabase/server"
import { NewsClient } from "@/components/admin/news-client"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "News & Blog Management - Aladgold Admin",
}

export default async function AdminNewsPage() {
    const supabase = await createClient()

    const { data: news } = await supabase
        .from('NewsPost')
        .select('*')
        .order('createdAt', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">News & Blog</h1>
                    <p className="text-muted-foreground">
                        Manage your company news and blog posts.
                    </p>
                </div>
            </div>

            <NewsClient initialData={news || []} />
        </div>
    )
}
