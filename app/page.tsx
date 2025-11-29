// app/page.tsx
"use client";
import { useState } from "react";
import ProfileView from "@/components/ProfileView";
import ProfileEdit from "@/components/ProfileEdit";
import NewPostForm from "@/components/NewPostForm";
import { useProfile } from "@/hooks/useProfile";

export default function Home() {
  const { data, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreatePost = (post: {
    title: string;
    body: string;
    images: string[];
  }) => {
    if (!data) return;

    updateProfile({
      posts: [
        ...data.posts,
        {
          ...post,
          is_pinned: false,
        },
      ],
    });

    setShowNewPostForm(false);
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
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
      {showNewPostForm ? (
        <NewPostForm
          onSubmit={handleCreatePost}
          onCancel={() => setShowNewPostForm(false)}
        />
      ) : /* Content */
      isEditing ? (
        <ProfileEdit profile={data} onUpdate={updateProfile} />
      ) : (
        <ProfileView profile={data} />
      )}
    </div>
  );
}
