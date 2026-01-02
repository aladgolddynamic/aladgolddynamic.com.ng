"use client"

import { useState, useEffect } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Mail, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSubscribers = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/admin/newsletter")
            if (!response.ok) throw new Error("Failed to fetch")
            const data = await response.json()
            setSubscribers(data)
        } catch (error) {
            toast.error("Could not load subscribers")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSubscribers()
    }, [])

    const downloadCSV = () => {
        if (subscribers.length === 0) {
            toast.error("No data to download")
            return
        }

        const headers = ["Email", "Subscribed At"]
        const rows = subscribers.map(s => [
            s.email,
            format(new Date(s.createdAt), "yyyy-MM-dd HH:mm:ss")
        ])

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `newsletter_subscribers_${format(new Date(), "yyyy-MM-dd")}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
                    <p className="text-muted-foreground">
                        Manage and export your newsletter subscriber list.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchSubscribers} disabled={isLoading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button onClick={downloadCSV} disabled={isLoading || subscribers.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Download CSV
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead>Subscribed Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-10">
                                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    Loading subscribers...
                                </TableCell>
                            </TableRow>
                        ) : subscribers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                    No subscribers found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            subscribers.map((subscriber, index) => (
                                <TableRow key={subscriber.id}>
                                    <TableCell className="font-medium text-muted-foreground">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        {subscriber.email}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(subscriber.createdAt), "PPP")}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
