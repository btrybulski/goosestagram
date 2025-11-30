// hooks/useProfile.ts
import { useState, useEffect, useRef } from "react";
import { Profile } from "@/types/profile";

export function useProfile() {
  const [data, setData] = useState<Profile | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");
    eventSource.onmessage = (event) => {
      const profile = JSON.parse(event.data);
      setData(profile);

      // Apply theme from profile
      applyTheme(profile.theme || "light");
    };
    return () => eventSource.close();
  }, []);

  const applyTheme = (theme: string) => {
    document.documentElement.classList.remove("dark", "colorful");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "colorful") {
      document.documentElement.classList.add("colorful");
    }
  };

  const updateProfile = (updates: Partial<Profile>) => {
    if (!data) return;
    const newData = { ...data, ...updates };
    setData(newData);

    // Apply theme immediately if it was updated
    if (updates.theme) {
      applyTheme(updates.theme);
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    }, 500);
  };

  return { data, updateProfile };
}
