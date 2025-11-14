"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";

interface HeroSectionData {
  greeting?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  cta_text?: string; // CTA button text
  cta_url?: string; // Frontend CTA URL (stored in cta_text field)
  cv_url?: string; // CV URL (stored in cta_url field)
  profile_image_url?: string;
}

export default function AdminHeroPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<HeroSectionData>();

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        const authResponse = await fetch("/api/auth/me");
        if (!authResponse.ok) {
          router.push("/admin");
          return;
        }

        // Load existing hero data
        const heroResponse = await fetch("/api/portfolio/hero");
        if (heroResponse.ok) {
          const result = await heroResponse.json();
          const heroData = result.data;
          if (heroData) {
            Object.keys(heroData).forEach((key) => {
              setValue(key as keyof HeroSectionData, heroData[key]);
            });
            setProfileImageUrl(heroData.profile_image_url || "");
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("Failed to load hero section data");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [router, setValue]);

  const onSubmit = async (data: HeroSectionData) => {
    setIsSaving(true);
    try {
      const submitData = {
        ...data,
        profile_image_url: profileImageUrl,
      };

      const response = await fetch("/api/portfolio/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Status:", response.status);
        console.error("API Error Text:", errorText);
        throw new Error(
          `Failed to update hero section: ${response.status} - ${errorText}`
        );
      }

      toast.success("Hero section updated successfully!");
    } catch (error) {
      console.error("Error updating hero section:", error);
      toast.error("Failed to update hero section");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="border-b border-border pb-6 mb-6">
          <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-2">
            Customize the main hero section of your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="greeting"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Greeting
              </label>
              <input
                id="greeting"
                type="text"
                {...register("greeting")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Hello, I'm"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Name"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Full Stack Developer"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Subtitle
              </label>
              <input
                id="subtitle"
                type="text"
                {...register("subtitle")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Building amazing web experiences"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Brief description about yourself..."
              />
            </div>

            <div>
              <label
                htmlFor="cta_text"
                className="block text-sm font-medium text-foreground mb-2"
              >
                CTA Button Text
              </label>
              <input
                id="cta_text"
                type="text"
                {...register("cta_text")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="View My Work"
              />
            </div>

            <div>
              <label
                htmlFor="cta_url"
                className="block text-sm font-medium text-foreground mb-2"
              >
                CTA Button URL
              </label>
              <input
                id="cta_url"
                type="text"
                {...register("cta_url")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="#projects"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Profile Image
              </label>
              <ImageUpload
                currentImageUrl={profileImageUrl}
                onImageUploaded={(url) => setProfileImageUrl(url)}
                uploadEndpoint="/api/upload/hero-image"
                maxSize={5}
                className=""
              />
              <p className="text-sm text-muted-foreground mt-2">
                Upload a profile image for the hero section. Recommended size:
                400x400px or larger.
              </p>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="cv_url"
                className="block text-sm font-medium text-foreground mb-2"
              >
                CV Download URL
              </label>
              <input
                id="cv_url"
                type="url"
                {...register("cv_url")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/path/to/cv.pdf"
              />
              <p className="text-sm text-muted-foreground mt-2">
                URL to your CV/Resume file. This will be used for the download
                button in hero section.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  );
}
