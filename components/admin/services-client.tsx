"use client"

import { useState } from "react"
import { Plus, Pencil, Trash, MoreHorizontal, Zap } from "lucide-react"
import { getIcon } from "@/lib/icon-map"
import { toast } from "sonner"
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
    DialogFooter,
} from "@/components/ui/dialog"
import { ServiceForm } from "./service-form"
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

interface ServicesClientProps {
    initialData: any[]
}

export function ServicesClient({ initialData }: ServicesClientProps) {
    const [services, setServices] = useState(initialData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onAdd = () => {
        setSelectedService(null)
        setIsDialogOpen(true)
    }

    const onEdit = (service: any) => {
        setSelectedService(service)
        setIsDialogOpen(true)
    }

    const onDeleteClick = (service: any) => {
        setSelectedService(service)
        setIsAlertOpen(true)
    }

    const onDeleteConfirm = async () => {
        if (!selectedService) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/admin/services/${selectedService.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setServices(services.filter((s) => s.id !== selectedService.id))
            toast.success("Service deleted successfully")
        } catch (error) {
            toast.error("Failed to delete service")
        } finally {
            setIsLoading(false)
            setIsAlertOpen(false)
        }
    }

    const onSuccess = (service: any, isNew: boolean) => {
        if (isNew) {
            setServices([...services, service])
        } else {
            setServices(services.map((s) => (s.id === service.id ? service : s)))
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Services List</h2>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                </Button>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Order</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Icon</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No services found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>{service.order}</TableCell>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell>
                                        {(() => {
                                            const Icon = getIcon(service.icon)
                                            return (
                                                <div className={`p-2 rounded-md ${service.color} w-fit`}>
                                                    <Icon className="h-4 w-4 text-white" />
                                                </div>
                                            )
                                        })()}
                                    </TableCell>
                                    <TableCell>{service.featured ? "Yes" : "No"}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEdit(service)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => onDeleteClick(service)}
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedService ? "Edit Service" : "Add Service"}</DialogTitle>
                        <DialogDescription>
                            {selectedService
                                ? "Update the details of your service."
                                : "Create a new service offering for your website."}
                        </DialogDescription>
                    </DialogHeader>
                    <ServiceForm
                        initialData={selectedService}
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
                            This action cannot be undone. This will permanently delete the service
                            "{selectedService?.title}" and remove its data from our servers.
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
