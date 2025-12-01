import { useState } from "react";

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
  const [clickCount, setClickCount] = useState(0);
  const [gooseMode, setGooseMode] = useState(false);
  const [geese, setGeese] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      setGooseMode(true);

      // Play honk sound
      const honk = new Audio("/goose-honk.m4a");
      honk.volume = 0.5; // 50% volume so it's not too loud
      honk.play().catch((err) => console.log("Audio play failed:", err));

      // Spawn geese
      const newGeese = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setGeese(newGeese);

      // Reset after animation
      setTimeout(() => {
        setGeese([]);
        setGooseMode(false);
        setClickCount(0);
      }, 5000);
    }

    // Reset count after 1 second
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/favicon.ico"
              alt="Logo"
              className="w-7 h-7 sm:w-9 sm:h-9 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleLogoClick}
            />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Goosestagram
            </h1>
          </div>
          <div className="flex gap-2 sm:gap-3">
            {showNewPostForm ? (
              <button
                onClick={onNewPost}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-700 shadow-sm transition-all font-medium"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={onNewPost}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-sm transition-all font-medium"
              >
                <span className="hidden sm:inline">+ New Post</span>
                <span className="sm:hidden">+</span>
              </button>
            )}
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
      {/* Goose Mode Animation */}
      {gooseMode && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {geese.map((goose) => (
            <div
              key={goose.id}
              className="absolute text-6xl animate-float"
              style={{
                left: `${goose.x}px`,
                top: `${goose.y}px`,
                animation: `float 3s ease-in-out infinite, fade 5s ease-out forwards`,
              }}
            >
              🦆
            </div>
          ))}
        </div>
      )}
    </>
  );
}
