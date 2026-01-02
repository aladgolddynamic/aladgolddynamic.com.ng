"use client"

import { useState } from "react"
import { Plus, Pencil, Trash, MoreHorizontal, Newspaper, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { NewsForm } from "./news-form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

interface NewsClientProps {
    initialData: any[]
}

export function NewsClient({ initialData }: NewsClientProps) {
    const [news, setNews] = useState(initialData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onAdd = () => {
        setSelectedPost(null)
        setIsDialogOpen(true)
    }

    const onEdit = (post: any) => {
        setSelectedPost(post)
        setIsDialogOpen(true)
    }

    const onDeleteClick = (post: any) => {
        setSelectedPost(post)
        setIsAlertOpen(true)
    }

    const onDeleteConfirm = async () => {
        if (!selectedPost) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/admin/news/${selectedPost.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setNews(news.filter((p) => p.id !== selectedPost.id))
            toast.success("News post deleted successfully")
        } catch (error) {
            toast.error("Failed to delete news post")
        } finally {
            setIsLoading(false)
            setIsAlertOpen(false)
        }
    }

    const onSuccess = (post: any, isNew: boolean) => {
        if (isNew) {
            setNews([post, ...news])
        } else {
            setNews(news.map((p) => (p.id === post.id ? post : p)))
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">News & Announcements</h2>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create News Post
                </Button>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Published Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {news.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No news posts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            news.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <div className="relative h-12 w-16 rounded-md overflow-hidden border">
                                            <Image
                                                fill
                                                src={post.image || "/placeholder.png"}
                                                alt={post.title}
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{post.title}</span>
                                            <span className="text-xs text-muted-foreground">/{post.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={post.published ? "default" : "secondary"}>
                                            {post.published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/news/${post.slug}`} target="_blank">
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        View on Site
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onEdit(post)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => onDeleteClick(post)}
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedPost ? "Edit News Post" : "Create News Post"}</DialogTitle>
                        <DialogDescription>
                            {selectedPost
                                ? "Update the details and content of your news post."
                                : "Write a new announcement or blog post for your website."}
                        </DialogDescription>
                    </DialogHeader>
                    <NewsForm
                        initialData={selectedPost}
                        onSuccess={onSuccess}
                        onCancel={() => setIsDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the news post
                            "{selectedPost?.title}" and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={onDeleteConfirm}
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
