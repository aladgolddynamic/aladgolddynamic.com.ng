"use client"

import { useState } from "react"
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    onRemove: () => void
    disabled?: boolean
}

export function ImageUpload({ value, onChange, onRemove, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) throw new Error("Upload failed")

            const data = await response.json()
            onChange(data.url)
            toast.success("Image uploaded successfully")
        } catch (error) {
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4 w-full">
            {value ? (
                <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                    <Image
                        fill
                        src={value}
                        alt="Upload"
                        className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={onRemove}
                            disabled={disabled || isUploading}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-md bg-muted/50 hover:bg-muted/70 transition cursor-pointer relative">
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="h-10 w-10 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground text-center px-4">
                                Click to upload an image or drag and drop
                            </span>
                        </div>
                    )}
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={onUpload}
                        accept="image/*"
                        disabled={disabled || isUploading}
                    />
                </div>
            )}
        </div>
    )
}
