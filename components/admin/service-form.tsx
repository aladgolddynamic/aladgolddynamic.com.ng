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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, Save, X, Plus, Trash2, Building2, Zap, Sun, Droplets, FileText, ShoppingCart, Monitor, Cloud, Wrench, HardHat, Lightbulb, ShieldCheck, Network, Lock, Globe, Cpu, Server, GraduationCap, Settings2, ShieldAlert, Wifi, Cctv } from "lucide-react"

const serviceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().min(1, "Icon name is required"),
    color: z.string().min(1, "Color class is required"),
    category: z.string().min(1, "Category is required"),
    capabilities: z.array(z.string()).min(1, "At least one capability is required"),
    featured: z.boolean().default(false),
    order: z.preprocess((val) => Number(val), z.number().min(0)),
})

type ServiceFormValues = z.infer<typeof serviceSchema>

interface ServiceFormProps {
    initialData: any
    onSuccess: (data: any, isNew: boolean) => void
    onCancel: () => void
}

export function ServiceForm({ initialData, onSuccess, onCancel }: ServiceFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const isNew = !initialData

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                capabilities: Array.isArray(initialData.capabilities)
                    ? initialData.capabilities
                    : JSON.parse(initialData.capabilities || "[]"),
                order: Number(initialData.order),
            }
            : {
                title: "",
                description: "",
                icon: "Zap",
                color: "bg-blue-500",
                category: "engineering",
                capabilities: [""],
                featured: false,
                order: 0,
            },
    })

    const [capabilities, setCapabilities] = useState<string[]>(
        initialData
            ? (Array.isArray(initialData.capabilities) ? initialData.capabilities : JSON.parse(initialData.capabilities || "[]"))
            : [""]
    )

    const addCapability = () => setCapabilities([...capabilities, ""])
    const removeCapability = (index: number) => {
        if (capabilities.length > 1) {
            setCapabilities(capabilities.filter((_, i) => i !== index))
        }
    }
    const updateCapability = (index: number, value: string) => {
        const newCaps = [...capabilities]
        newCaps[index] = value
        setCapabilities(newCaps)
        form.setValue("capabilities", newCaps)
    }

    async function onSubmit(values: ServiceFormValues) {
        setIsLoading(true)
        try {
            const url = isNew ? "/api/admin/services" : `/api/admin/services/${initialData.id}`
            const method = isNew ? "POST" : "PUT"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, capabilities }),
            })

            if (!response.ok) throw new Error("Failed to save")

            const savedService = await response.json()
            toast.success(isNew ? "Service created" : "Service updated")
            onSuccess(savedService, isNew)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="e.g. Civil Engineering" />
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
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} disabled={isLoading} rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an icon" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Building2">Building</SelectItem>
                                        <SelectItem value="Zap">Energy / Electrical</SelectItem>
                                        <SelectItem value="Sun">Solar / Renewable</SelectItem>
                                        <SelectItem value="Droplets">Water Resources</SelectItem>
                                        <SelectItem value="FileText">Consultancy</SelectItem>
                                        <SelectItem value="ShoppingCart">Procurement</SelectItem>
                                        <SelectItem value="Monitor">IT / Technology</SelectItem>
                                        <SelectItem value="Cloud">Cloud Services</SelectItem>
                                        <SelectItem value="Wrench">Engineering</SelectItem>
                                        <SelectItem value="HardHat">Construction</SelectItem>
                                        <SelectItem value="Lightbulb">Innovation</SelectItem>
                                        <SelectItem value="ShieldCheck">Security / Quality</SelectItem>
                                        <SelectItem value="Network">Network Management</SelectItem>
                                        <SelectItem value="Lock">Information Security</SelectItem>
                                        <SelectItem value="Globe">Web Development</SelectItem>
                                        <SelectItem value="Cpu">Software Integration</SelectItem>
                                        <SelectItem value="Server">Data Management</SelectItem>
                                        <SelectItem value="GraduationCap">ICT Training</SelectItem>
                                        <SelectItem value="Settings2">Business Automation</SelectItem>
                                        <SelectItem value="ShieldAlert">Cyber Security</SelectItem>
                                        <SelectItem value="Wifi">Connectivity</SelectItem>
                                        <SelectItem value="Cctv">Surveillance / CCTV</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        <SelectItem value="engineering">Engineering Services</SelectItem>
                                        <SelectItem value="consultancy">Consultancy Services</SelectItem>
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
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Theme Color</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a color" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="bg-blue-500">Blue (Standard)</SelectItem>
                                        <SelectItem value="bg-amber-500">Amber (Warning/Power)</SelectItem>
                                        <SelectItem value="bg-orange-500">Orange (Energy)</SelectItem>
                                        <SelectItem value="bg-cyan-500">Cyan (Water)</SelectItem>
                                        <SelectItem value="bg-purple-500">Purple (Consultancy)</SelectItem>
                                        <SelectItem value="bg-green-500">Green (Growth/Procurement)</SelectItem>
                                        <SelectItem value="bg-indigo-500">Indigo (Tech)</SelectItem>
                                        <SelectItem value="bg-sky-500">Sky Blue (Cloud)</SelectItem>
                                        <SelectItem value="bg-emerald-500">Emerald</SelectItem>
                                        <SelectItem value="bg-slate-500">Slate (Infrastructure)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <FormLabel>Capabilities</FormLabel>
                    <div className="space-y-2">
                        {capabilities.map((cap, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={cap}
                                    onChange={(e) => updateCapability(index, e.target.value)}
                                    disabled={isLoading}
                                    placeholder={`Capability ${index + 1}`}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeCapability(index)}
                                    disabled={isLoading || capabilities.length === 1}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addCapability}
                            disabled={isLoading}
                            className="mt-2"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Capability
                        </Button>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Show on Homepage</FormLabel>
                                <FormDescription>
                                    This service will be featured in the homepage services section.
                                </FormDescription>
                            </div>
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
                                {isNew ? "Create Service" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
