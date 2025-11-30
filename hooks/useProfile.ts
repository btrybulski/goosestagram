// hooks/useProfile.ts
import { useState, useEffect, useRef } from "react";
import { Profile } from "@/types/profile";

export function useProfile() {
  const [data, setData] = useState<Profile | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");
    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => eventSource.close();
  }, []);

  const updateProfile = (updates: Partial<Profile>) => {
    if (!data) return;
    const newData = { ...data, ...updates };
    setData(newData);

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
