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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"
import { ImageUpload } from "./image-upload"
import { Switch } from "@/components/ui/switch"

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    client: z.string().min(1, "Client is required"),
    location: z.string().min(1, "Location is required"),
    year: z.string().optional().nullable(),
    budget: z.string().optional().nullable(),
    status: z.string().min(1, "Status is required"),
    description: z.string().min(1, "Description is required"),
    scope: z.string().optional().nullable(), // Will be parsed as JSON in API but kept as raw text/JSON in form for now
    image: z.string().min(1, "Image is required"),
    featured: z.boolean().default(false),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
    initialData: any
    onSuccess: (data: any, isNew: boolean) => void
    onCancel: () => void
}

export function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const isNew = !initialData

    // Helper to parse scope from initialData
    const getInitialScopeString = (data: any) => {
        if (!data?.scope) return "";
        if (Array.isArray(data.scope)) {
            return data.scope.join("\n");
        }
        try {
            const parsed = JSON.parse(data.scope);
            if (Array.isArray(parsed)) {
                return parsed.join("\n");
            }
        } catch (e) {
            // If parsing fails, treat as plain string
        }
        return data.scope; // Fallback to raw string if not array or valid JSON array
    };

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                scope: getInitialScopeString(initialData),
                featured: !!initialData.featured,
            }
            : {
                title: "",
                category: "construction",
                client: "",
                location: "",
                year: "",
                budget: "",
                status: "ONGOING",
                description: "",
                scope: "",
                image: "",
                featured: false,
            },
    })

    async function onSubmit(values: ProjectFormValues) {
        setIsLoading(true)
        try {
            const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${initialData.id}`
            const method = isNew ? "POST" : "PUT"

            // Convert scope text back to array for API
            const finalValues = {
                ...values,
                scope: values.scope ? values.scope.split("\n").filter(line => line.trim() !== "") : []
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalValues),
            })

            if (!response.ok) throw new Error("Failed to save")

            const savedProject = await response.json()
            toast.success(isNew ? "Project created" : "Project updated")
            onSuccess(savedProject, isNew)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Image</FormLabel>
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

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} placeholder="e.g. Federal Ministry Road..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="construction">Construction</SelectItem>
                                        <SelectItem value="solar">Solar Energy</SelectItem>
                                        <SelectItem value="water">Water Resources</SelectItem>
                                        <SelectItem value="electrical">Electrical Systems</SelectItem>
                                        <SelectItem value="procurement">Procurement</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="e.g. Lagos State Government" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="e.g. Lagos State" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} disabled={isLoading} placeholder="e.g. 2023" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} disabled={isLoading} placeholder="e.g. ₦320M" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Featured Project</FormLabel>
                                <FormDescription>
                                    Featured projects appear in the highlighted section of the Projects page.
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

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} disabled={isLoading} rows={4} placeholder="Detailed project description..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="scope"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Scope</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value || ""}
                                    disabled={isLoading}
                                    rows={5}
                                    placeholder="Enter scope items, one per line..."
                                />
                            </FormControl>
                            <FormDescription>
                                Enter each deliverable or scope item on a new line.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2 pt-4">
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
                                {isNew ? "Create Project" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
