// app/page.tsx
"use client";
import { useState } from "react";
import ProfileView from "@/components/ProfileView";
import ProfileEdit from "@/components/ProfileEdit";
import NewPostForm from "@/components/NewPostForm";
import Header from "@/components/Header";
import OnboardingChecklist from "@/components/OnboardingChecklist";
import CreateProfilePrompt from "@/components/CreateProfilePrompt";
import { useProfile } from "@/hooks/useProfile";
import { Profile } from "@/types/profile";

export default function Home() {
  const { data, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreateProfile = async (username: string) => {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to create profile");
        return;
      }

      // Profile created, SSE will update automatically
      // Reload to pick up new profile
      window.location.reload();
    } catch (err) {
      alert("Failed to create profile");
      console.error(err);
    }
  };

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

  const handleReorderPosts = (newPosts: Profile["posts"]) => {
    if (!data) return;
    updateProfile({ posts: newPosts });
  };

  const completeOnboarding = () => {
    if (!data) return;
    updateProfile({ onboarding_completed: true });
  };

  // Loading state
  if (data === undefined) {
    return <div className="p-8">Loading...</div>;
  }

  // Show create profile prompt if no profile exists
  if (data === null) {
    return <CreateProfilePrompt onCreateProfile={handleCreateProfile} />;
  }

  // Check onboarding progress
  const hasProfileInfo = !!(data.username && data.display_name && data.bio);
  const hasPost = data.posts.length > 0;
  const hasPinnedPost = data.posts.some((p) => p.is_pinned);
  const showOnboarding =
    !data.onboarding_completed &&
    (!hasProfileInfo || !hasPost || !hasPinnedPost);

  return (
    <div>
      <Header
        onNewPost={() => {
          setIsEditing(false);
          setShowNewPostForm(!showNewPostForm);
        }}
        onSettings={() => {
          setShowNewPostForm(false);
          setIsEditing(!isEditing);
        }}
        showNewPostForm={showNewPostForm}
        isEditing={isEditing}
      />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          {/* Onboarding Checklist */}
          {showOnboarding && (
            <OnboardingChecklist
              hasProfileInfo={hasProfileInfo}
              hasPost={hasPost}
              hasPinnedPost={hasPinnedPost}
              onComplete={completeOnboarding}
              onEditProfile={() => setIsEditing(true)}
              onCreatePost={() => setShowNewPostForm(true)}
            />
          )}

          {showNewPostForm ? (
            <NewPostForm
              onSubmit={handleCreatePost}
              onCancel={() => setShowNewPostForm(false)}
            />
          ) : isEditing ? (
            <ProfileEdit profile={data} onUpdate={updateProfile} />
          ) : (
            <div className="space-y-8">
              <ProfileView
                profile={data}
                onCreatePost={() => setShowNewPostForm(true)}
                onTogglePin={handleTogglePin}
                onReorder={handleReorderPosts}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
