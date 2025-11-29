// app/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { Profile } from "@/types/profile";
import ProfileView from "@/components/ProfileView";
import ProfileEdit from "@/components/ProfileEdit";

export default function Home() {
  const [data, setData] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const addNewPost = () => {
    if (!data) return;

    const newPost = {
      title: "New Post",
      body: "Write something here...",
      images: [],
      is_pinned: false,
    };

    updateProfile({
      posts: [...data.posts, newPost],
    });
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="flex gap-3">
          <button
            onClick={addNewPost}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + New Post
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? "Done Editing" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <ProfileEdit profile={data} onUpdate={updateProfile} />
      ) : (
        <ProfileView profile={data} />
      )}
    </div>
  );
}
