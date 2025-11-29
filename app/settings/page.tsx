"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Profile from "../types/profile";

export default function Settings() {
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

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(async () => {
      await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    }, 500);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-400 underline">
          ← Back to Profile
        </Link>
      </div>

      <h1 className="text-4xl mb-8">Edit Profile</h1>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={data.username}
            onChange={(e) => updateProfile({ username: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Display Name</label>
          <input
            type="text"
            value={data.display_name}
            onChange={(e) => updateProfile({ display_name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Bio</label>
          <textarea
            value={data.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            className="w-full p-2 border rounded h-24"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Profile Photo URL</label>
          <input
            type="text"
            value={data.profile_photo}
            onChange={(e) => updateProfile({ profile_photo: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Links</h2>

          <div className="space-y-3">
            <div>
              <label className="block mb-1">Website</label>
              <input
                type="url"
                value={data.links.website}
                onChange={(e) =>
                  updateProfile({
                    links: { ...data.links, website: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">LinkedIn</label>
              <input
                type="url"
                value={data.links.linkedin}
                onChange={(e) =>
                  updateProfile({
                    links: { ...data.links, linkedin: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Facebook</label>
              <input
                type="url"
                value={data.links.facebook}
                onChange={(e) =>
                  updateProfile({
                    links: { ...data.links, facebook: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">YouTube</label>
              <input
                type="url"
                value={data.links.youtube}
                onChange={(e) =>
                  updateProfile({
                    links: { ...data.links, youtube: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">X (Twitter)</label>
              <input
                type="url"
                value={data.links.x}
                onChange={(e) =>
                  updateProfile({
                    links: { ...data.links, x: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
