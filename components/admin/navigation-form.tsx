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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"

const navigationSchema = z.object({
    label: z.string().min(1, "Label is required"),
    href: z.string().min(1, "URL path is required"),
    order: z.preprocess((val) => Number(val), z.number().min(0)),
    type: z.string().min(1, "Menu type is required"),
})

type NavigationFormValues = z.infer<typeof navigationSchema>

const FIXED_PAGES = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "News", href: "/news" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
]

interface NavigationFormProps {
    initialData: any
    existingItems: any[]
    defaultType: string
    onSuccess: (data: any, isNew: boolean) => void
    onCancel: () => void
}

export function NavigationForm({ initialData, existingItems, defaultType, onSuccess, onCancel }: NavigationFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const isNew = !initialData

    const form = useForm<NavigationFormValues>({
        resolver: zodResolver(navigationSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                order: Number(initialData.order),
            }
            : {
                label: "",
                href: "",
                order: 0,
                type: defaultType,
            },
    })

    // Filter out pages already in the CURRENT menu type (header or footer)
    // but allow the current item if we're editing
    const availablePages = FIXED_PAGES.filter(page => {
        const alreadyExists = existingItems.some(item =>
            item.href === page.href &&
            item.type === form.getValues("type") &&
            item.id !== initialData?.id
        )
        return !alreadyExists
    })

    async function onSubmit(values: NavigationFormValues) {
        setIsLoading(true)
        try {
            const url = isNew ? "/api/admin/navigation" : `/api/admin/navigation/${initialData.id}`
            const method = isNew ? "POST" : "PUT"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!response.ok) throw new Error("Failed to save")

            const savedItem = await response.json()
            toast.success(isNew ? "Link added" : "Link updated")
            onSuccess(savedItem, isNew)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Menu Type</FormLabel>
                            <Select
                                disabled={isLoading || !isNew}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="header">Header</SelectItem>
                                    <SelectItem value="footer">Footer</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="href"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Page</FormLabel>
                            <Select
                                disabled={isLoading || !isNew}
                                onValueChange={(val) => {
                                    field.onChange(val)
                                    // Also update label if it's empty or matching previous selection
                                    const page = FIXED_PAGES.find(p => p.href === val)
                                    if (page && (!form.getValues("label") || FIXED_PAGES.some(p => p.label === form.getValues("label")))) {
                                        form.setValue("label", page.label)
                                    }
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a page" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {availablePages.map((page) => (
                                        <SelectItem key={page.href} value={page.href}>
                                            {page.label} ({page.href})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>Select from dedicated system pages.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link Label</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} placeholder="e.g. Services" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display Order</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} disabled={isLoading} />
                            </FormControl>
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
                                {isNew ? "Add Link" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
