"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";

interface AboutData {
  bio?: string;
  profile_image_url?: string;
  cv_url?: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  instagram_url?: string;
}

export default function AdminAboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<AboutData>();

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        const authResponse = await fetch("/api/admin/auth/me");
        if (!authResponse.ok) {
          router.push("/admin");
          return;
        }

        // Load existing about data
        const aboutResponse = await fetch("/api/admin/about");
        if (aboutResponse.ok) {
          const aboutData = await aboutResponse.json();
          if (aboutData) {
            Object.keys(aboutData).forEach((key) => {
              setValue(key as keyof AboutData, aboutData[key]);
            });
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("Failed to load about data");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [router, setValue]);

  const onSubmit = async (data: AboutData) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update about info");
      }

      toast.success("About information updated successfully!");
    } catch (error) {
      console.error("Error updating about info:", error);
      toast.error("Failed to update about information");
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
          <h1 className="text-3xl font-bold text-foreground">
            About Information
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your personal and contact information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={5}
                {...register("bio")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell visitors about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register("location")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your City, Country"
                />
              </div>

              <div>
                <label
                  htmlFor="profile_image_url"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Profile Image URL
                </label>
                <input
                  id="profile_image_url"
                  type="url"
                  {...register("profile_image_url")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              <div>
                <label
                  htmlFor="cv_url"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  CV/Resume URL
                </label>
                <input
                  id="cv_url"
                  type="url"
                  {...register("cv_url")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/cv.pdf"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Social Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="github_url"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    GitHub URL
                  </label>
                  <input
                    id="github_url"
                    type="url"
                    {...register("github_url")}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="linkedin_url"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    LinkedIn URL
                  </label>
                  <input
                    id="linkedin_url"
                    type="url"
                    {...register("linkedin_url")}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="twitter_url"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Twitter URL
                  </label>
                  <input
                    id="twitter_url"
                    type="url"
                    {...register("twitter_url")}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="instagram_url"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Instagram URL
                  </label>
                  <input
                    id="instagram_url"
                    type="url"
                    {...register("instagram_url")}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>
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
