import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Admin authentication hook
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/me");

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/admin");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, isLoading, checkAuth };
}

// Data fetching hook with caching
export function useAdminData<T>(endpoint: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(endpoint);
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData, setData };
}

// Form submission hook
export function useAdminForm<T extends Record<string, unknown>>(
  initialData: T,
  onSuccess?: () => void
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateField = useCallback(
    (field: keyof T, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear field error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setIsSubmitting(false);
  }, [initialData]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    // Add validation logic here based on your requirements
    Object.keys(formData).forEach((key) => {
      const field = key as keyof T;
      const value = formData[field];

      // Example validation - customize based on your needs
      if (typeof value === "string" && !value.trim()) {
        if (field === "title" || field === "description") {
          newErrors[field] = `${String(field)} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitForm = useCallback(
    async (
      endpoint: string,
      method: "POST" | "PUT" = "POST",
      additionalParams?: Record<string, unknown>
    ) => {
      if (!validateForm()) return false;

      try {
        setIsSubmitting(true);
        setErrors({});

        const body = { ...formData, ...additionalParams };
        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await response.json();

        if (response.ok) {
          onSuccess?.();
          return { success: true, data: result };
        } else {
          setErrors({ general: result.error || "Submission failed" } as Partial<
            Record<keyof T, string>
          >);
          return { success: false, error: result.error };
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setErrors({ general: errorMessage } as Partial<
          Record<keyof T, string>
        >);
        return { success: false, error: errorMessage };
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSuccess]
  );

  return {
    formData,
    setFormData,
    updateField,
    errors,
    isSubmitting,
    resetForm,
    submitForm,
  };
}

// Local storage hook for admin preferences
export function useAdminPreferences() {
  const [preferences, setPreferences] = useState({
    theme: "light" as "light" | "dark",
    sidebarCollapsed: false,
    defaultPageSize: 10,
  });

  useEffect(() => {
    const stored = localStorage.getItem("admin-preferences");
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse admin preferences:", error);
      }
    }
  }, []);

  const updatePreference = useCallback(
    <K extends keyof typeof preferences>(
      key: K,
      value: (typeof preferences)[K]
    ) => {
      setPreferences((prev) => {
        const updated = { ...prev, [key]: value };
        localStorage.setItem("admin-preferences", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  return { preferences, updatePreference };
}
