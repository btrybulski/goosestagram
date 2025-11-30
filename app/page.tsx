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

  const handleTogglePin = (index: number) => {
    if (!data) return;

    const updatedPosts = data.posts.map((post, i) =>
      i === index ? { ...post, is_pinned: !post.is_pinned } : post,
    );

    updateProfile({ posts: updatedPosts });
  };

  const handleReorderPosts = (newPosts: typeof data.posts) => {
    if (!data) return;
    updateProfile({ posts: newPosts });
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
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {showNewPostForm ? (
          <NewPostForm
            onSubmit={handleCreatePost}
            onCancel={() => setShowNewPostForm(false)}
          />
        ) : isEditing ? (
          <ProfileEdit profile={data} onUpdate={updateProfile} />
        ) : (
          <ProfileView
            profile={data}
            onCreatePost={() => setShowNewPostForm(true)}
            onTogglePin={handleTogglePin}
            onReorder={handleReorderPosts}
          />
        )}
      </div>
    </div>
  );
}
