/**
 * Upload Form Input Component
 * Provides the file input and submit button for PDF uploads
 * Handles the visual representation of the upload interface
 */

'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;  // Form submission handler
  isUploading: boolean;  // Upload state to show loading indicator
}

export default function UploadFormInput({ onSubmit, isUploading }: UploadFormInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-4 items-center">
      <div className="flex-1 relative">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          disabled={isUploading}
          className="bg-white/10 border-gray-200/20 text-gray-200 cursor-pointer file:cursor-pointer"
          placeholder="Select a PDF file"
        />
      </div>

      <Button 
        disabled={isUploading}
        className="min-w-[140px] transition-all duration-200"
        type="submit"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload PDF
          </>
        )}
      </Button>
    </form>
  );
}