"use client"

import { useState } from "react"
import { Plus, Pencil, Trash, MoreHorizontal, Link as LinkIcon, Move } from "lucide-react"
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
} from "@/components/ui/dialog"
import { NavigationForm } from "./navigation-form"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NavigationClientProps {
    initialData: any[]
}

export function NavigationClient({ initialData }: NavigationClientProps) {
    const [navigation, setNavigation] = useState(initialData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("header")

    const filteredNavigation = navigation.filter((item) => item.type === activeTab)

    const onAdd = () => {
        setSelectedItem(null)
        setIsDialogOpen(true)
    }

    const onEdit = (item: any) => {
        setSelectedItem(item)
        setIsDialogOpen(true)
    }

    const onDeleteClick = (item: any) => {
        setSelectedItem(item)
        setIsAlertOpen(true)
    }

    const onDeleteConfirm = async () => {
        if (!selectedItem) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/admin/navigation/${selectedItem.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setNavigation(navigation.filter((n) => n.id !== selectedItem.id))
            toast.success("Link deleted successfully")
        } catch (error) {
            toast.error("Failed to delete link")
        } finally {
            setIsLoading(false)
            setIsAlertOpen(false)
        }
    }

    const onSuccess = (item: any, isNew: boolean) => {
        if (isNew) {
            setNavigation([...navigation, item])
        } else {
            setNavigation(navigation.map((n) => (n.id === item.id ? item : n)))
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Site Navigation</h2>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                </Button>
            </div>

            <Tabs defaultValue="header" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                    <TabsTrigger value="header">Header Menu</TabsTrigger>
                    <TabsTrigger value="footer">Footer Menu</TabsTrigger>
                </TabsList>
                <div className="mt-4 rounded-md border bg-background">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Order</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Path / Href</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNavigation.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No navigation links found for {activeTab}.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredNavigation
                                    .sort((a, b) => a.order - b.order)
                                    .map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.order}</TableCell>
                                            <TableCell className="font-medium">{item.label}</TableCell>
                                            <TableCell className="font-mono text-xs">{item.href}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => onEdit(item)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => onDeleteClick(item)}
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
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{selectedItem ? "Edit Link" : "Add Link"}</DialogTitle>
                        <DialogDescription>
                            {selectedItem
                                ? "Update the details of the navigation link."
                                : "Add a new link to your website's navigation menu."}
                        </DialogDescription>
                    </DialogHeader>
                    <NavigationForm
                        initialData={selectedItem}
                        existingItems={navigation}
                        defaultType={activeTab}
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
                            This action cannot be undone. This will permanently delete the link
                            "{selectedItem?.label}" and remove it from your website.
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
