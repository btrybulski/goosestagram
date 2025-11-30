// app/page.tsx
"use client";
import { useState } from "react";
import ProfileView from "@/components/ProfileView";
import ProfileEdit from "@/components/ProfileEdit";
import NewPostForm from "@/components/NewPostForm";
import Header from "@/components/Header";
import { useProfile } from "@/hooks/useProfile";

export default function Home() {
  const { data, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreatePost = (post: {
    title: string;
    body: string;
    image: string;
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
    <div>
      <Header
        onNewPost={() => setShowNewPostForm(!showNewPostForm)}
        onSettings={() => setIsEditing(!isEditing)}
        showNewPostForm={showNewPostForm}
        isEditing={isEditing}
      />
      <div className="max-w-4xl mx-auto p-8">
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
    </div>
  );
}
