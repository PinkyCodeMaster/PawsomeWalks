"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Loader2 } from 'lucide-react';
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { content: string; image?: string }) => void;
}

export default function CreatePostDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreatePostDialogProps) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsUploading(true);
    try {
      onSubmit({
        content,
        image: imageUrl || undefined,
      });

      setContent("");
      setImageUrl(null);
      onOpenChange(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setIsUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          {imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt="Uploaded image"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex justify-between">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setImageUrl(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: "w-[120px] h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                allowedContent: "hidden",
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isUploading}
            >
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}