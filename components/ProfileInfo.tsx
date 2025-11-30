// components/ProfileInfo.tsx
import { Profile } from "@/types/profile";

interface ProfileInfoProps {
  profile: Profile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const links = [
    { label: "Website", url: profile.links.website },
    { label: "LinkedIn", url: profile.links.linkedin },
    { label: "Facebook", url: profile.links.facebook },
    { label: "YouTube", url: profile.links.youtube },
    { label: "X", url: profile.links.x },
  ].filter((link) => link.url);

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        {profile.profile_photo && (
          <img
            src={profile.profile_photo}
            alt={profile.display_name}
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-2xl font-semibold">{profile.display_name}</h2>
          <p className="text-gray-600">@{profile.username}</p>
        </div>
      </div>
      <p className="text-lg mb-3">{profile.bio}</p>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center mt-4 pt-4 border-t">
          {links.map((link, idx) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.label}
              </a>
              {idx < links.length - 1 && (
                <span className="ml-2 text-gray-400">•</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
