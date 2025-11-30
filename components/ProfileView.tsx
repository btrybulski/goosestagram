// components/ProfileView.tsx
import { Profile } from "@/types/profile";
import ProfileInfo from "./ProfileInfo";
import PostsFeed from "./PostsFeed";

interface ProfileViewProps {
  profile: Profile;
  onCreatePost: () => void;
  onTogglePin: (index: number) => void;
  onReorder: (newPosts: Profile["posts"]) => void;
}

export default function ProfileView({
  profile,
  onCreatePost,
  onTogglePin,
  onReorder,
}: ProfileViewProps) {
  return (
    <div className="space-y-6">
      <ProfileInfo profile={profile} />
      <PostsFeed
        posts={profile.posts}
        onCreatePost={onCreatePost}
        onTogglePin={onTogglePin}
        onReorder={onReorder}
      />
    </div>
  );
}
