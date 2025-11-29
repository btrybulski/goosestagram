// components/ProfileEdit.tsx
import { Profile } from "@/types/profile";

interface ProfileEditProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}

export default function ProfileEdit({ profile, onUpdate }: ProfileEditProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          value={profile.username}
          onChange={(e) => onUpdate({ username: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Display Name</label>
        <input
          type="text"
          value={profile.display_name}
          onChange={(e) => onUpdate({ display_name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          className="w-full p-2 border rounded h-24"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Profile Photo URL</label>
        <input
          type="text"
          value={profile.profile_photo}
          onChange={(e) => onUpdate({ profile_photo: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Links</h2>

        <div className="space-y-3">
          <div>
            <label className="block mb-1">Website</label>
            <input
              type="url"
              value={profile.links.website}
              onChange={(e) =>
                onUpdate({
                  links: { ...profile.links, website: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">LinkedIn</label>
            <input
              type="url"
              value={profile.links.linkedin}
              onChange={(e) =>
                onUpdate({
                  links: { ...profile.links, linkedin: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Facebook</label>
            <input
              type="url"
              value={profile.links.facebook}
              onChange={(e) =>
                onUpdate({
                  links: { ...profile.links, facebook: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">YouTube</label>
            <input
              type="url"
              value={profile.links.youtube}
              onChange={(e) =>
                onUpdate({
                  links: { ...profile.links, youtube: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">X (Twitter)</label>
            <input
              type="url"
              value={profile.links.x}
              onChange={(e) =>
                onUpdate({
                  links: { ...profile.links, x: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
