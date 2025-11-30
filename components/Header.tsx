// components/Header.tsx
interface HeaderProps {
  onNewPost: () => void;
  onSettings: () => void;
  showNewPostForm: boolean;
  isEditing: boolean;
}

export default function Header({
  onNewPost,
  onSettings,
  showNewPostForm,
  isEditing,
}: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/favicon.ico"
            alt="Logo"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <h1 className="text-xl sm:text-3xl font-bold">Goosestagram</h1>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onNewPost}
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-green-500 text-white rounded hover:bg-green-600"
          >
            {showNewPostForm ? (
              "Cancel"
            ) : (
              <span className="hidden sm:inline">+ New Post</span>
            )}
            <span className="sm:hidden">+</span>
          </button>
          <button
            onClick={onSettings}
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? (
              "Done"
            ) : (
              <span className="hidden sm:inline">Settings</span>
            )}
            <span className="sm:hidden">⚙️</span>
          </button>
        </div>
      </div>
    </header>
  );
}
