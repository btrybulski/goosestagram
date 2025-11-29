// app/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { Profile } from "@/types/profile";
import ProfileView from "@/components/ProfileView";
import ProfileEdit from "@/components/ProfileEdit";

export default function Home() {
  const [data, setData] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    images: [] as string[],
  });
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

  const createPost = () => {
    if (!data || !newPost.title || !newPost.body) {
      alert("Title and body are required");
      return;
    }

    updateProfile({
      posts: [
        ...data.posts,
        {
          ...newPost,
          is_pinned: false,
        },
      ],
    });

    setNewPost({ title: "", body: "", images: [] });
    setShowNewPostForm(false);
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {showNewPostForm ? "Cancel" : "+ New Post"}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? "Done Editing" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="mb-6 border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Body</label>
              <textarea
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                className="w-full p-2 border rounded h-32"
                placeholder="What's on your mind?"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Images (optional, comma-separated URLs)
              </label>
              <input
                type="text"
                value={newPost.images.join(", ")}
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    images: e.target.value
                      .split(",")
                      .map((url) => url.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>
            <button
              onClick={createPost}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Post
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {isEditing ? (
        <ProfileEdit profile={data} onUpdate={updateProfile} />
      ) : (
        <ProfileView profile={data} />
      )}
    </div>
  );
}
