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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save } from "lucide-react"

const profileSchema = z.object({
    heroTitle: z.string().min(1, "Hero title is required"),
    heroSubtitle: z.string().min(1, "Hero subtitle is required"),
    aboutContent: z.string().min(1, "About content is required"),
    mission: z.string().min(1, "Mission is required"),
    vision: z.string().min(1, "Vision is required"),
    values: z.string().min(1, "Values are required"),
    address: z.string().min(1, "Address is required"),
    phone1: z.string().min(1, "Phone 1 is required"),
    phone2: z.string().optional(),
    email: z.string().email("Invalid email address"),
    facebookUrl: z.string().url("Invalid URL").optional().or(z.string().length(0)),
    twitterUrl: z.string().url("Invalid URL").optional().or(z.string().length(0)),
    instagramUrl: z.string().url("Invalid URL").optional().or(z.string().length(0)),
    linkedinUrl: z.string().url("Invalid URL").optional().or(z.string().length(0)),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface CompanyFormProps {
    initialData: any
}

export function CompanyForm({ initialData }: CompanyFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: initialData || {
            heroTitle: "",
            heroSubtitle: "",
            aboutContent: "",
            mission: "",
            vision: "",
            values: "",
            address: "",
            phone1: "",
            phone2: "",
            email: "",
            facebookUrl: "",
            twitterUrl: "",
            instagramUrl: "",
            linkedinUrl: "",
        },
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/admin/company", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to update profile")
            }

            toast.success("Company profile updated successfully")
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle>Homepage Hero</CardTitle>
                            <CardDescription>
                                Edit the main text that appears at the top of the homepage.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="heroTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hero Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="heroSubtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hero Subtitle</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} disabled={isLoading} rows={3} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle>Company Overview</CardTitle>
                            <CardDescription>
                                Mission, Vision, and Core values.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="aboutContent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About Content</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} disabled={isLoading} rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="mission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mission</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} disabled={isLoading} rows={4} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vision"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vision</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} disabled={isLoading} rows={4} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="values"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Values</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} disabled={isLoading} rows={4} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>
                                Public contact details shown on the website and footer.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone 1</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone 2</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>
                                URLs for company social media profiles.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="facebookUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Facebook URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder="https://facebook.com/..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="twitterUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Twitter (X) URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder="https://x.com/..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instagramUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder="https://instagram.com/..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="linkedinUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder="https://linkedin.com/..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isLoading} className="px-8">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
