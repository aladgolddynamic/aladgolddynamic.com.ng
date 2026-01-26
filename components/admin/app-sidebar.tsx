"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Building2,
    Zap,
    Briefcase,
    Newspaper,
    Users,
    Inbox,
    Mail,
    Settings,
    LogOut,
    ChevronRight,
    MoreHorizontal,
    Navigation,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
    user: {
        name: "Admin",
        email: "admin@aladgold.com",
        avatar: "/avatars/admin.png",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Company Profile",
            url: "/admin/company",
            icon: Building2,
        },
        {
            title: "Services",
            url: "/admin/services",
            icon: Zap,
        },
        {
            title: "Projects",
            url: "/admin/projects",
            icon: Briefcase,
        },
        {
            title: "News",
            url: "/admin/news",
            icon: Newspaper,
        },
        {
            title: "Team",
            url: "/admin/team",
            icon: Users,
        },
        {
            title: "Jobs",
            url: "/admin/jobs",
            icon: Briefcase,
        },
        {
            title: "Newsletter",
            url: "/admin/newsletter",
            icon: Mail,
        },
        {
            title: "Navigation",
            url: "/admin/navigation",
            icon: Navigation,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Building2 className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="font-semibold">Aladgold Admin</span>
                                    <span className="text-xs">CMS Panel</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    isActive={pathname === item.url}
                                >
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {mounted && (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="font-semibold">{data.user.name}</span>
                                            <span className="text-xs">{data.user.email}</span>
                                        </div>
                                        <MoreHorizontal className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/admin/login" })}>
                                        <LogOut className="mr-2 size-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
