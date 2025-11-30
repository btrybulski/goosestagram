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
    <header className="border-b bg-white sticky top-0 z-10 shadow-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/favicon.ico"
            alt="Logo"
            className="w-7 h-7 sm:w-9 sm:h-9"
          />
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Goosestagram
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onNewPost}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-sm transition-all font-medium"
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
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 shadow-sm transition-all font-medium"
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
