import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Newspaper, Zap, Users, Inbox } from "lucide-react"

export default async function AdminDashboard() {
    const supabase = await createClient()

    const [
        { count: servicesCount },
        { count: projectsCount },
        { count: newsCount },
        { count: teamCount },
        { count: contactsCount }
    ] = await Promise.all([
        supabase.from('Service').select('*', { count: 'exact', head: true }),
        supabase.from('Project').select('*', { count: 'exact', head: true }),
        supabase.from('NewsPost').select('*', { count: 'exact', head: true }),
        supabase.from('TeamMember').select('*', { count: 'exact', head: true }),
        supabase.from('ContactSubmission').select('*', { count: 'exact', head: true }),
    ])

    const stats = [
        {
            title: "Total Services",
            value: servicesCount || 0,
            icon: Zap,
            description: "Active service offerings",
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Projects",
            value: projectsCount || 0,
            icon: Briefcase,
            description: "Completed & ongoing",
            color: "text-indigo-600",
            bg: "bg-indigo-100",
        },
        {
            title: "News Posts",
            value: newsCount || 0,
            icon: Newspaper,
            description: "Updates & announcements",
            color: "text-emerald-600",
            bg: "bg-emerald-100",
        },
        {
            title: "Team Members",
            value: teamCount || 0,
            icon: Users,
            description: "Company staff profiles",
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
        {
            title: "Inquiries",
            value: contactsCount || 0,
            icon: Inbox,
            description: "Contact form messages",
            color: "text-rose-600",
            bg: "bg-rose-100",
        },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">
                    Welcome to the Aladgold Management System. Here's a summary of your website content.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>System Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            Chart or activity feed would go here.
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-sm text-muted-foreground">
                            Coming soon: Shortcut buttons to common management tasks.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
