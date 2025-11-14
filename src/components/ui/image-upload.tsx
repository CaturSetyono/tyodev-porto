"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
  uploadEndpoint: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUploaded,
  uploadEndpoint,
  accept = "image/*",
  maxSize = 5,
  className = "",
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (file: File) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsUploading(true);

      try {
        // Check authentication first
        const authCheck = await fetch("/api/debug/auth");
        const authResult = await authCheck.json();
        console.log("Auth check:", authResult);

        if (!authResult.data?.isAuthenticated) {
          throw new Error("Please login to admin panel first");
        }

        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Upload file
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading to:", uploadEndpoint);
        console.log("File details:", {
          name: file.name,
          size: file.size,
          type: file.type,
        });

        const response = await fetch(uploadEndpoint, {
          method: "POST",
          body: formData,
        });

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        let result;
        try {
          result = await response.json();
          console.log("Response data:", result);
        } catch (parseError) {
          console.error("Failed to parse response:", parseError);
          throw new Error(
            `Upload failed: Invalid response from server (Status: ${response.status})`
          );
        }

        if (!response.ok) {
          const errorMessage =
            result?.error ||
            result?.message ||
            `Upload failed with status ${response.status}`;
          throw new Error(errorMessage);
        }

        // Cleanup object URL
        URL.revokeObjectURL(objectUrl);

        // Set final image URL
        const imageUrl = result?.data?.url || result?.url;
        if (!imageUrl) {
          throw new Error("No image URL returned from server");
        }

        setPreviewUrl(imageUrl);
        onImageUploaded(imageUrl);

        toast.success(result.message || "Image uploaded successfully!");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to upload image"
        );

        // Reset preview on error
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(currentImageUrl || null);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadEndpoint, maxSize, onImageUploaded, currentImageUrl, previewUrl]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0 && files[0]) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0 && files[0]) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleRemoveImage = useCallback(() => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl, onImageUploaded]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload Area */}
      {!previewUrl && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200 min-h-[200px] flex flex-col items-center justify-center
            ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary hover:bg-gray-50"
            }
            ${isUploading ? "pointer-events-none opacity-50" : ""}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Upload className="h-8 w-8 text-gray-600" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  Drop your image here
                </p>
                <p className="text-sm text-gray-600">
                  or click to browse from your device
                </p>
                <p className="text-xs text-gray-500">
                  Supports JPG, PNG, WebP, GIF (max {maxSize}MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={previewUrl}
              alt="Profile preview"
              fill
              className="object-cover"
              onError={() => {
                console.error("Failed to load image");
                setPreviewUrl(null);
              }}
            />
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="
              absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full
              hover:bg-red-600 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Replace button */}
          <button
            type="button"
            onClick={openFileDialog}
            disabled={isUploading}
            className="
              absolute bottom-2 right-2 px-3 py-1 bg-black/70 text-white text-sm
              rounded-md hover:bg-black/80 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <ImageIcon className="h-4 w-4 inline mr-1" />
            Replace
          </button>
        </div>
      )}
    </div>
  );
}
