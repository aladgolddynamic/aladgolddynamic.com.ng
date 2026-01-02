"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"
import { ImageUpload } from "./image-upload"

const newsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().optional().or(z.string().length(0)),
    published: z.boolean().default(false),
})

type NewsFormValues = z.infer<typeof newsSchema>

interface NewsFormProps {
    initialData: any
    onSuccess: (data: any, isNew: boolean) => void
    onCancel: () => void
}

export function NewsForm({ initialData, onSuccess, onCancel }: NewsFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const isNew = !initialData

    const form = useForm<NewsFormValues>({
        resolver: zodResolver(newsSchema),
        defaultValues: initialData || {
            title: "",
            excerpt: "",
            content: "",
            image: "",
            published: false,
        },
    })

    async function onSubmit(values: NewsFormValues) {
        setIsLoading(true)
        try {
            const url = isNew ? "/api/admin/news" : `/api/admin/news/${initialData.id}`
            const method = isNew ? "POST" : "PUT"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!response.ok) throw new Error("Failed to save")

            const savedPost = await response.json()
            toast.success(isNew ? "News post created" : "News post updated")
            onSuccess(savedPost, isNew)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading} placeholder="e.g. Aladgold Expands to New Regions" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Excerpt (Short Summary)</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isLoading} rows={3} placeholder="A brief summary of the post..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Post Content (Markdown supported)</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isLoading} rows={15} className="font-mono text-sm" placeholder="Write your full post content here..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-6">
                        <Card className="p-4">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Featured Image</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                                onRemove={() => field.onChange("")}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>

                        <Card className="p-4 space-y-4">
                            <h3 className="font-medium">Publication Settings</h3>
                            <FormField
                                control={form.control}
                                name="published"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Published</FormLabel>
                                            <FormDescription>
                                                Visible on the public website.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </Card>
                    </div>
                </div>

                <div className="flex justify-end gap-2 border-t pt-6">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {isNew ? "Publish News" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
            {children}
        </div>
    )
}
