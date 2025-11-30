// types/profile.ts
export interface Profile {
  username: string;
  display_name: string;
  profile_photo: string;
  bio: string;
  theme?: "light" | "dark" | "colorful";
  onboarding_completed?: boolean;
  links: {
    website: string;
    linkedin: string;
    facebook: string;
    youtube: string;
    x: string;
  };
  posts: Array<{
    title: string;
    body: string;
    image: string;
    is_pinned: boolean;
  }>;
}
