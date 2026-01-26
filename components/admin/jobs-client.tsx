"use client"

import { useState } from "react"
import { Plus, Pencil, Trash, MoreHorizontal, Briefcase } from "lucide-react"
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
import { JobForm } from "./job-form"
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

interface JobsClientProps {
    initialData: any[]
}

export function JobsClient({ initialData }: JobsClientProps) {
    const [jobs, setJobs] = useState(initialData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onAdd = () => {
        setSelectedJob(null)
        setIsDialogOpen(true)
    }

    const onEdit = (job: any) => {
        setSelectedJob(job)
        setIsDialogOpen(true)
    }

    const onDeleteClick = (job: any) => {
        setSelectedJob(job)
        setIsAlertOpen(true)
    }

    const onDeleteConfirm = async () => {
        if (!selectedJob) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/admin/jobs/${selectedJob.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setJobs(jobs.filter((j) => j.id !== selectedJob.id))
            toast.success("Job deleted successfully")
        } catch (error) {
            toast.error("Failed to delete job")
        } finally {
            setIsLoading(false)
            setIsAlertOpen(false)
        }
    }

    const onSuccess = (job: any, isNew: boolean) => {
        if (isNew) {
            setJobs([job, ...jobs])
        } else {
            setJobs(jobs.map((j) => (j.id === job.id ? job : j)))
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Job Vacancies</h2>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                </Button>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Page</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No jobs found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.type}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {job.pageSlug}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={job.status === "OPEN" ? "default" : "secondary"}>
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEdit(job)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => onDeleteClick(job)}
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
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedJob ? "Edit Job" : "Post Job"}</DialogTitle>
                        <DialogDescription>
                            {selectedJob
                                ? "Update the details of the job vacancy."
                                : "Post a new career opportunity on your website."}
                        </DialogDescription>
                    </DialogHeader>
                    <JobForm
                        initialData={selectedJob}
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
                            This action cannot be undone. This will permanently delete the job vacancy
                            "{selectedJob?.title}" and remove its data from our servers.
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
