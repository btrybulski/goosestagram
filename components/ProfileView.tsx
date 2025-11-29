// components/ProfileView.tsx
import Profile from "@/types/profile";
import ProfileInfo from "./ProfileInfo";
import PostsFeed from "./PostsFeed";

interface ProfileViewProps {
  profile: Profile;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      <ProfileInfo profile={profile} />
      <PostsFeed profile={profile} />
    </div>
  );
}
