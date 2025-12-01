import { useState } from "react";

interface OnboardingChecklistProps {
  hasProfileInfo: boolean;
  hasPost: boolean;
  hasPinnedPost: boolean;
  onComplete: () => void;
  onEditProfile: () => void;
  onCreatePost: () => void;
}

export default function OnboardingChecklist({
  hasProfileInfo,
  hasPost,
  hasPinnedPost,
  onComplete,
  onEditProfile,
  onCreatePost,
}: OnboardingChecklistProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const allComplete = hasProfileInfo && hasPost && hasPinnedPost;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {isMinimized ? (
        // Minimized view
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <span className="text-xl">📋</span>
          <span className="font-semibold">Getting Started</span>
          <span className="bg-white text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {[hasProfileInfo, hasPost, hasPinnedPost].filter(Boolean).length}/3
          </span>
        </button>
      ) : (
        // Expanded view
        <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-300 overflow-hidden animate-slideIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              <div>
                <h3 className="font-bold text-lg">Getting Started</h3>
                <p className="text-sm text-blue-100">
                  {
                    [hasProfileInfo, hasPost, hasPinnedPost].filter(Boolean)
                      .length
                  }
                  /3 completed
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                title="Minimize"
              >
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button
                onClick={onComplete}
                className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                title="Dismiss"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
            {/* Task 1 */}
            <div
              className={`p-3 rounded-lg border-2 transition-all ${
                hasProfileInfo
                  ? "bg-green-100 border-green-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="text-lg mt-0.5">
                  {hasProfileInfo ? "✅" : "⬜"}
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-sm ${hasProfileInfo ? "text-green-900" : "text-gray-900"}`}
                  >
                    {hasProfileInfo
                      ? "Profile updated!"
                      : "Update your profile"}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${hasProfileInfo ? "text-green-700" : "text-gray-600"}`}
                  >
                    Add your name, bio, and photo
                  </p>
                  {!hasProfileInfo && (
                    <button
                      onClick={onEditProfile}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Go to Settings →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div
              className={`p-3 rounded-lg border-2 transition-all ${
                hasPost
                  ? "bg-green-100 border-green-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="text-lg mt-0.5">{hasPost ? "✅" : "⬜"}</div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-sm ${hasPost ? "text-green-900" : "text-gray-900"}`}
                  >
                    {hasPost ? "First post created!" : "Create your first post"}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${hasPost ? "text-green-700" : "text-gray-600"}`}
                  >
                    Share something with the world
                  </p>
                  {!hasPost && (
                    <button
                      onClick={onCreatePost}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Create Post →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Task 3 */}
            <div
              className={`p-3 rounded-lg border-2 transition-all ${
                hasPinnedPost
                  ? "bg-green-100 border-green-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="text-lg mt-0.5">
                  {hasPinnedPost ? "✅" : "⬜"}
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-sm ${hasPinnedPost ? "text-green-900" : "text-gray-900"}`}
                  >
                    {hasPinnedPost ? "Post pinned!" : "Pin your favorite post"}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${hasPinnedPost ? "text-green-700" : "text-gray-600"}`}
                  >
                    Click &quot;Pin&quot; on any post to keep it at the top
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          {allComplete && (
            <div className="border-t-2 border-blue-100 p-4 bg-blue-50">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎉</span>
                  <p className="text-sm font-semibold text-blue-900">
                    All done!
                  </p>
                </div>
                <button
                  onClick={onComplete}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
