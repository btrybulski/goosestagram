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
    <div className="rounded-xl bg-white shadow-md border border-gray-200 p-6 sm:p-8">
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          {profile.profile_photo ? (
            <img
              src={profile.profile_photo}
              alt={profile.display_name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover flex-shrink-0 ring-4 ring-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white shadow-lg">
              {profile.display_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {profile.display_name}
            </h2>
            <p className="text-gray-500 mb-3">@{profile.username}</p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-gray-200 justify-center sm:justify-start">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:text-blue-600 transition-all shadow-sm hover:shadow"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
