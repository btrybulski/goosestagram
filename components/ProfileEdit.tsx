// components/ProfileEdit.tsx
import { Profile } from "@/types/profile";
import { useState, useRef } from "react";

interface ProfileEditProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}

export default function ProfileEdit({ profile, onUpdate }: ProfileEditProps) {
  const [showImport, setShowImport] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [importText, setImportText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // URL validation
  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty is valid (optional)
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.username}_profile.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          onUpdate(imported);
          setShowImport(false);
          alert("Profile imported successfully!");
        } catch (err) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportFromText = () => {
    try {
      const imported = JSON.parse(importText);
      onUpdate(imported);
      setShowImport(false);
      setImportText("");
      alert("Profile imported successfully!");
    } catch (err) {
      alert("Invalid JSON format");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ profile_photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfile = () => {
    if (
      !confirm(
        "Are you sure you want to reset your profile? This will delete all your data including posts, and cannot be undone.",
      )
    ) {
      return;
    }

    const resetProfile = {
      username: profile.username, // Keep username
      display_name: "",
      profile_photo: "",
      bio: "",
      theme: "light" as const,
      onboarding_completed: false,
      links: {
        website: "",
        linkedin: "",
        facebook: "",
        youtube: "",
        x: "",
      },
      posts: [],
    };

    onUpdate(resetProfile);
    alert("Profile has been reset!");
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Upload - Now at top */}
      <div>
        <label className="block mb-2 font-semibold">Profile Photo</label>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <div
          onClick={() => photoInputRef.current?.click()}
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors overflow-hidden bg-gray-100"
        >
          {profile.profile_photo ? (
            <img
              src={profile.profile_photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
        {profile.profile_photo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ profile_photo: "" });
              if (photoInputRef.current) photoInputRef.current.value = "";
            }}
            className="mt-2 text-sm text-red-500 hover:text-red-700"
          >
            Remove photo
          </button>
        )}
      </div>

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

      {/* Collapsible Links Section */}
      <div>
        <button
          onClick={() => setShowLinks(!showLinks)}
          className="flex items-center justify-between w-full p-3 mb-2 font-semibold border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Links
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${showLinks ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showLinks && (
          <div className="space-y-3 pl-4 border-l-2 border-blue-300 py-2">
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
                className={`w-full p-2 border-2 rounded transition-colors ${
                  profile.links.website && !isValidUrl(profile.links.website)
                    ? "border-red-400 bg-red-50"
                    : profile.links.website
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                }`}
                placeholder="https://example.com"
              />
              {profile.links.website && !isValidUrl(profile.links.website) && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ Please enter a valid URL starting with http:// or https://
                </p>
              )}
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
                className={`w-full p-2 border-2 rounded transition-colors ${
                  profile.links.linkedin && !isValidUrl(profile.links.linkedin)
                    ? "border-red-400 bg-red-50"
                    : profile.links.linkedin
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                }`}
                placeholder="https://linkedin.com/in/username"
              />
              {profile.links.linkedin &&
                !isValidUrl(profile.links.linkedin) && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Please enter a valid URL starting with http:// or
                    https://
                  </p>
                )}
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
                className={`w-full p-2 border-2 rounded transition-colors ${
                  profile.links.facebook && !isValidUrl(profile.links.facebook)
                    ? "border-red-400 bg-red-50"
                    : profile.links.facebook
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                }`}
                placeholder="https://facebook.com/username"
              />
              {profile.links.facebook &&
                !isValidUrl(profile.links.facebook) && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Please enter a valid URL starting with http:// or
                    https://
                  </p>
                )}
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
                className={`w-full p-2 border-2 rounded transition-colors ${
                  profile.links.youtube && !isValidUrl(profile.links.youtube)
                    ? "border-red-400 bg-red-50"
                    : profile.links.youtube
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                }`}
                placeholder="https://youtube.com/@username"
              />
              {profile.links.youtube && !isValidUrl(profile.links.youtube) && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ Please enter a valid URL starting with http:// or https://
                </p>
              )}
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
                className={`w-full p-2 border-2 rounded transition-colors ${
                  profile.links.x && !isValidUrl(profile.links.x)
                    ? "border-red-400 bg-red-50"
                    : profile.links.x
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                }`}
                placeholder="https://x.com/username"
              />
              {profile.links.x && !isValidUrl(profile.links.x) && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ Please enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <div>
        <label className="block mb-2 font-semibold">Theme</label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ theme: "light" })}
            className={`px-4 py-2 border-2 rounded transition-colors ${
              (profile.theme || "light") === "light"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            ☀️ Light
          </button>
          <button
            onClick={() => onUpdate({ theme: "dark" })}
            className={`px-4 py-2 border-2 rounded transition-colors ${
              profile.theme === "dark"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            🌙 Dark
          </button>
          <button
            onClick={() => onUpdate({ theme: "colorful" })}
            className={`px-4 py-2 border-2 rounded transition-colors ${
              profile.theme === "colorful"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            🎨 Colorful
          </button>
        </div>
      </div>

      {/* Import/Export Section - No divider */}
      <div className="pt-4">
        <h2 className="text-2xl font-semibold mb-4">Import/Export</h2>
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            📥 Export Profile
          </button>
          <button
            onClick={() => setShowImport(!showImport)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📤 Import Profile
          </button>
          <button
            onClick={handleResetProfile}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            🔄 Reset Profile
          </button>
        </div>

        {showImport && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Import Profile</h3>

            <div className="mb-4">
              <label className="block mb-2 text-sm">Upload JSON File</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleImportFromFile}
                className="w-full p-2 border rounded bg-white"
              />
            </div>

            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 border-t"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Paste JSON</label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full p-2 border rounded h-32 font-mono text-sm"
                placeholder='{"username": "...", "display_name": "...", ...}'
              />
              <button
                onClick={handleImportFromText}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Import from Text
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
