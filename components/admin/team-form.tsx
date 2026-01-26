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

const teamSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    bio: z.string().min(1, "Bio is required"),
    image: z.string().optional().or(z.string().length(0)),
    order: z.preprocess((val) => Number(val), z.number().min(0)),
    visible: z.boolean().default(true),
    // Auth fields
    email: z.string().email().optional().or(z.string().length(0)),
    password: z.string().min(6).optional().or(z.string().length(0)),
    enableLogin: z.boolean().default(false),
})

type TeamFormValues = z.infer<typeof teamSchema>

interface TeamFormProps {
    initialData: any
    onSuccess: (data: any, isNew: boolean) => void
    onCancel: () => void
}

export function TeamForm({ initialData, onSuccess, onCancel }: TeamFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const isNew = !initialData

    const form = useForm<TeamFormValues>({
        resolver: zodResolver(teamSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                order: Number(initialData.order),
                email: initialData.email || "",
                password: "", // Never populate password back
                enableLogin: !!initialData.email,
            }
            : {
                name: "",
                role: "",
                bio: "",
                image: "",
                order: 0,
                visible: true,
                email: "",
                password: "",
                enableLogin: false,
            },
    })

    // Watch enableLogin to conditionally show email/password
    const enableLogin = form.watch("enableLogin")

    async function onSubmit(values: TeamFormValues) {
        setIsLoading(true)
        try {
            const url = isNew ? "/api/admin/team" : `/api/admin/team/${initialData.id}`
            const method = isNew ? "POST" : "PUT"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to save")
            }

            const savedMember = await response.json()
            toast.success(isNew ? "Member added" : "Member updated")
            onSuccess(savedMember, isNew)
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
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
                            <FormLabel>Profile Photo</FormLabel>
                            <FormControl>
                                <div className="flex flex-col items-center">
                                    <ImageUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        onRemove={() => field.onChange("")}
                                        disabled={isLoading}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="e.g. John Doe" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role / Designation</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="e.g. Managing Director" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Biography</FormLabel>
                            <FormControl>
                                <Textarea {...field} disabled={isLoading} rows={4} placeholder="Short bio..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Display Order</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormDescription>Lower numbers appear first.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="visible"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-8">
                                <div className="space-y-0.5">
                                    <FormLabel>Active Status</FormLabel>
                                    <FormDescription>Visible on the team page.</FormDescription>
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
                </div>

                {/* Login Credentials Section */}
                <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
                    <FormField
                        control={form.control}
                        name="enableLogin"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                                <div className="space-y-0.5">
                                    <FormLabel>Enable Dashboard Login</FormLabel>
                                    <FormDescription>
                                        Allow this team member to log in to the admin panel.
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

                    {enableLogin && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder="staff@company.com" type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{isNew ? "Password" : "New Password"}</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder={isNew ? "******" : "Leave blank to keep current"} type="password" />
                                        </FormControl>
                                        <FormDescription>
                                            {isNew ? "Required for login" : "Only if changing"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
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
                                {isNew ? "Add Member" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
