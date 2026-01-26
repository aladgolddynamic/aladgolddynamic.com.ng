"use client"

import { useState } from "react"
import { Eye, Trash, MoreHorizontal, Mail, CheckCircle2, Clock } from "lucide-react"
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

interface ContactsClientProps {
    initialData: any[]
}

export function ContactsClient({ initialData }: ContactsClientProps) {
    const [contacts, setContacts] = useState(initialData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onView = (contact: any) => {
        setSelectedContact(contact)
        setIsDialogOpen(true)

        // Mark as read automatically if it was pending
        if (contact.status === "PENDING") {
            updateStatus(contact.id, "READ")
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/contacts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            if (!response.ok) throw new Error("Failed to update")

            setContacts((prev) =>
                prev.map((c) => (c.id === id ? { ...c, status } : c))
            )
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    const onDeleteClick = (contact: any) => {
        setSelectedContact(contact)
        setIsAlertOpen(true)
    }

    const onDeleteConfirm = async () => {
        if (!selectedContact) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setContacts(contacts.filter((c) => c.id !== selectedContact.id))
            toast.success("Submission deleted successfully")
        } catch (error) {
            toast.error("Failed to delete submission")
        } finally {
            setIsLoading(false)
            setIsAlertOpen(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Inquiries Inbox</h2>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Sender</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No inquiries found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <TableRow key={contact.id} className={contact.status === "PENDING" ? "bg-muted/30" : ""}>
                                    <TableCell className="text-sm">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{contact.name}</span>
                                            <span className="text-xs text-muted-foreground">{contact.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{contact.subject}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                contact.status === "PENDING"
                                                    ? "destructive"
                                                    : contact.status === "READ"
                                                        ? "secondary"
                                                        : "default"
                                            }
                                        >
                                            {contact.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onView(contact)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => updateStatus(contact.id, "REPLIED")}>
                                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                                        Mark as Replied
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => onDeleteClick(contact)}
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                        <DialogDescription>
                            From: {selectedContact?.name} ({selectedContact?.email})
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold text-muted-foreground">Subject:</span>
                                <p>{selectedContact?.subject}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-muted-foreground">Date:</span>
                                <p>{selectedContact?.createdAt && new Date(selectedContact.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-md bg-muted/50 border">
                            <span className="font-semibold text-sm text-muted-foreground block mb-2">Message:</span>
                            <p className="whitespace-pre-wrap text-sm">{selectedContact?.message}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Close
                        </Button>
                        <Button asChild>
                            <a href={`mailto:${selectedContact?.email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Reply via Email
                            </a>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the inquiry from
                            "{selectedContact?.name}" and remove its data from our servers.
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
