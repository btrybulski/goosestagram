// components/ProfileView.tsx
import Profile from "@/types/profile";

interface ProfileViewProps {
  profile: Profile;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  const links = [
    { label: "Website", url: profile.links.website },
    { label: "LinkedIn", url: profile.links.linkedin },
    { label: "Facebook", url: profile.links.facebook },
    { label: "YouTube", url: profile.links.youtube },
    { label: "X", url: profile.links.x },
  ].filter((link) => link.url);

  return (
    <div className="space-y-6">
      {/* Profile Info Box */}
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
        <p className="text-lg">{profile.bio}</p>
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Links</h3>
          <div className="flex flex-wrap gap-2 items-center">
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
        </div>
      )}

      {/* Posts */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Posts</h3>
        {profile.posts.map((post, idx) => (
          <div key={idx} className="border p-4 rounded mb-3 bg-white shadow-sm">
            <h4 className="font-semibold text-lg">{post.title}</h4>
            <p className="mt-2">{post.body}</p>
            {post.is_pinned && (
              <span className="inline-block mt-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                📌 Pinned
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
