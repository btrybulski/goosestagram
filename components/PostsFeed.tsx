import { useState } from "react";

interface Post {
  title: string;
  body: string;
  image: string;
  is_pinned: boolean;
}

interface PostsFeedProps {
  posts: Post[];
  onCreatePost: () => void;
  onTogglePin: (index: number) => void;
  onReorder: (newPosts: Post[]) => void;
}

function PostCard({
  post,
  index,
  onTogglePin,
  isDraggable,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  post: Post;
  index: number;
  onTogglePin: (index: number) => void;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ${
        isDraggable ? "cursor-move" : ""
      }`}
      draggable={isDraggable}
      onDragStart={isDraggable ? (e) => onDragStart?.(e, index) : undefined}
      onDragOver={isDraggable ? onDragOver : undefined}
      onDrop={isDraggable ? (e) => onDrop?.(e, index) : undefined}
    >
      {/* Drag handle - only visible on hover for draggable posts */}
      {isDraggable && (
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm z-10">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </div>
      )}

      {/* Image */}
      {post.image && (
        <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1">
            {post.title}
          </h4>
          <button
            onClick={() => onTogglePin(index)}
            className={`flex-shrink-0 px-3 py-1 text-xs rounded-full font-medium transition-all ${
              post.is_pinned
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {post.is_pinned ? "📌 Pinned" : "Pin"}
          </button>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
      </div>
    </div>
  );
}

function EmptyState({ onCreatePost }: { onCreatePost: () => void }) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
      <div className="text-gray-400 mb-4">
        <svg
          className="mx-auto h-16 w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
      <p className="text-gray-500 mb-4">
        Share your first post with the world!
      </p>
      <button
        onClick={onCreatePost}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Your First Post
      </button>
    </div>
  );
}

export default function PostsFeed({
  posts,
  onCreatePost,
  onTogglePin,
  onReorder,
}: PostsFeedProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (posts.length === 0) {
    return <EmptyState onCreatePost={onCreatePost} />;
  }

  const pinnedPosts = posts.filter((p) => p.is_pinned);
  const regularPosts = posts.filter((p) => !p.is_pinned);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    // Work with the full posts array instead of just pinned
    const newPosts = [...posts];

    // Get the actual post objects being moved
    const draggedPost = newPosts[draggedIndex];
    const targetPost = newPosts[posts.indexOf(pinnedPosts[dropIndex])];

    // Find their positions in the full array
    const dragIdx = newPosts.indexOf(draggedPost);
    const dropIdx = newPosts.indexOf(targetPost);

    // Swap them
    newPosts.splice(dragIdx, 1);
    newPosts.splice(dropIdx, 0, draggedPost);

    onReorder(newPosts);
    setDraggedIndex(null);
  };

  return (
    <div>
      {/* Pinned Posts Section */}
      {pinnedPosts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-yellow-500">📌</span>
            Pinned Posts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pinnedPosts.map((post, idx) => {
              const originalIndex = posts.indexOf(post);
              return (
                <PostCard
                  key={`pinned-${idx}`}
                  post={post}
                  index={originalIndex}
                  onTogglePin={onTogglePin}
                  isDraggable={true}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Posts Section */}
      {regularPosts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {regularPosts.map((post, idx) => {
              const originalIndex = posts.indexOf(post);
              return (
                <PostCard
                  key={`regular-${idx}`}
                  post={post}
                  index={originalIndex}
                  onTogglePin={onTogglePin}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
