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
import { Loader2, Save, Plus, Trash2 } from "lucide-react"

const jobSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    requirements: z.array(z.string()).min(1, "At least one requirement is required"),
    location: z.string().min(1, "Location is required"),
    type: z.string().min(1, "Job type is required"),
    status: z.string().min(1, "Status is required"),
    pageSlug: z.string().min(1, "Page selection is required"),
})

type JobFormValues = z.infer<typeof jobSchema>

interface JobFormProps {
    initialData: any
    onSuccess: (data: any, isNew: boolean) => void
    onCancel: () => void
}

export function JobForm({ initialData, onSuccess, onCancel }: JobFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const isNew = !initialData

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                requirements: Array.isArray(initialData.requirements)
                    ? initialData.requirements
                    : JSON.parse(initialData.requirements || "[]"),
            }
            : {
                title: "",
                description: "",
                requirements: [""],
                location: "Abuja, FCT",
                type: "Full-time",
                status: "OPEN",
                pageSlug: "careers",
            },
    })

    const [requirements, setRequirements] = useState<string[]>(
        initialData
            ? (Array.isArray(initialData.requirements) ? initialData.requirements : JSON.parse(initialData.requirements || "[]"))
            : [""]
    )

    const addRequirement = () => setRequirements([...requirements, ""])
    const removeRequirement = (index: number) => {
        if (requirements.length > 1) {
            setRequirements(requirements.filter((_, i) => i !== index))
        }
    }
    const updateRequirement = (index: number, value: string) => {
        const newReqs = [...requirements]
        newReqs[index] = value
        setRequirements(newReqs)
        form.setValue("requirements", newReqs)
    }

    async function onSubmit(values: JobFormValues) {
        setIsLoading(true)
        try {
            const url = isNew ? "/api/admin/jobs" : `/api/admin/jobs/${initialData.id}`
            const method = isNew ? "POST" : "PUT"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, requirements }),
            })

            if (!response.ok) throw new Error("Failed to save")

            const savedJob = await response.json()
            toast.success(isNew ? "Job posted" : "Job updated")
            onSuccess(savedJob, isNew)
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} placeholder="e.g. Senior Civil Engineer" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="e.g. Abuja" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                        <SelectItem value="Freelance">Freelance</SelectItem>
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
                                        <SelectItem value="OPEN">Open</SelectItem>
                                        <SelectItem value="CLOSED">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pageSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Display Page</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select page" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="home">Home Page</SelectItem>
                                        <SelectItem value="about">About Page</SelectItem>
                                        <SelectItem value="services">Services Page</SelectItem>
                                        <SelectItem value="careers">Careers Page</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} disabled={isLoading} rows={4} placeholder="Job description and overview..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <FormLabel>Requirements</FormLabel>
                    <div className="space-y-2">
                        {requirements.map((req, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={req}
                                    onChange={(e) => updateRequirement(index, e.target.value)}
                                    disabled={isLoading}
                                    placeholder={`Requirement ${index + 1}`}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeRequirement(index)}
                                    disabled={isLoading || requirements.length === 1}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addRequirement}
                            disabled={isLoading}
                            className="mt-2"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Requirement
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
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
                                {isNew ? "Post Job" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
