import { useState } from "react";

interface CreateProfilePromptProps {
  onCreateProfile: (username: string) => void;
}

export default function CreateProfilePrompt({
  onCreateProfile,
}: CreateProfilePromptProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return;
    }

    onCreateProfile(username.toLowerCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🦆</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Goosestagram!
          </h1>
          <p className="text-gray-600">Create your profile to get started</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choose a username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className={`w-full p-3 border-2 rounded-lg text-lg ${
                error ? "border-red-400" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none`}
              placeholder="your_username"
              autoFocus
            />
            {error && <p className="text-sm text-red-600 mt-2">⚠️ {error}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Profile
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-sm text-blue-900 mb-2">
            What's next?
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✨ Customize your profile</li>
            <li>📝 Share your first post</li>
            <li>📌 Pin your favorites</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
