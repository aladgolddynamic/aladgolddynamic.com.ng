"use client"

import { useState } from "react"
import { Plus, Pencil, Trash, MoreHorizontal, Briefcase } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
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
import { ProjectForm } from "./project-form"
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

interface ProjectsClientProps {
    initialData: any[]
}

export function ProjectsClient({ initialData }: ProjectsClientProps) {
    const [projects, setProjects] = useState(initialData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onAdd = () => {
        setSelectedProject(null)
        setIsDialogOpen(true)
    }

    const onEdit = (project: any) => {
        setSelectedProject(project)
        setIsDialogOpen(true)
    }

    const onDeleteClick = (project: any) => {
        setSelectedProject(project)
        setIsAlertOpen(true)
    }

    const onDeleteConfirm = async () => {
        if (!selectedProject) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/admin/projects/${selectedProject.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setProjects(projects.filter((p) => p.id !== selectedProject.id))
            toast.success("Project deleted successfully")
        } catch (error) {
            toast.error("Failed to delete project")
        } finally {
            setIsLoading(false)
            setIsAlertOpen(false)
        }
    }

    const onSuccess = (project: any, isNew: boolean) => {
        if (isNew) {
            setProjects([project, ...projects])
        } else {
            setProjects(projects.map((p) => (p.id === project.id ? project : p)))
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Projects Portfolio</h2>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                </Button>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="relative h-12 w-16 rounded-md overflow-hidden border">
                                            <Image
                                                fill
                                                src={project.image || "/placeholder.png"}
                                                alt={project.title}
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell className="capitalize">{project.category}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === "COMPLETED" ? "default" : "secondary"}>
                                            {project.status}
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
                                                <DropdownMenuItem onClick={() => onEdit(project)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => onDeleteClick(project)}
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
                        <DialogTitle>{selectedProject ? "Edit Project" : "Add Project"}</DialogTitle>
                        <DialogDescription>
                            {selectedProject
                                ? "Update the details of your project."
                                : "Create a new project for your portfolio."}
                        </DialogDescription>
                    </DialogHeader>
                    <ProjectForm
                        initialData={selectedProject}
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
                            This action cannot be undone. This will permanently delete the project
                            "{selectedProject?.title}" and remove its data from our servers.
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
