export default function Header({
  onNewPost,
  onSettings,
  showNewPostForm,
  isEditing,
}: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Goosestagram</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onNewPost}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {showNewPostForm ? "Cancel" : "+ New Post"}
          </button>
          <button
            onClick={onSettings}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? "Done" : "Settings"}
          </button>
        </div>
      </div>
    </header>
  );
}
