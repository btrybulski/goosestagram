// components/PostsFeed.tsx
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
  onDragEnd,
}: {
  post: Post;
  index: number;
  onTogglePin: (index: number) => void;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: () => void;
}) {
  return (
    <div
      className={`border p-3 sm:p-4 rounded mb-3 bg-white shadow-sm hover:bg-gray-50 flex flex-col sm:flex-row justify-between items-start ${
        isDraggable ? "cursor-move" : ""
      }`}
      draggable={isDraggable}
      onDragStart={isDraggable ? (e) => onDragStart?.(e, index) : undefined}
      onDragOver={isDraggable ? onDragOver : undefined}
      onDrop={isDraggable ? (e) => onDrop?.(e, index) : undefined}
      onDragEnd={isDraggable ? onDragEnd : undefined}
    >
      <div className="flex flex-col sm:flex-row justify-start flex-1 w-full">
        {isDraggable && (
          <div className="mr-0 sm:mr-3 mb-2 sm:mb-0 text-gray-400 flex items-center justify-center sm:justify-start">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
            </svg>
          </div>
        )}
        {post.image && (
          <div className="mb-3 sm:mb-0 sm:mr-8 flex-shrink-0 w-full sm:w-auto">
            <img
              src={post.image}
              alt=""
              className="w-full sm:w-60 h-auto rounded object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          {post.is_pinned && (
            <span className="inline-block mb-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              📌 Pinned
            </span>
          )}
          <h4 className="font-semibold text-base sm:text-lg">{post.title}</h4>
          <p className="mt-2 text-sm sm:text-base text-gray-700">{post.body}</p>
        </div>
      </div>
      <button
        onClick={() => onTogglePin(index)}
        className={`mt-3 sm:mt-0 sm:ml-4 px-3 py-1 text-sm rounded flex-shrink-0 w-full sm:w-auto ${
          post.is_pinned
            ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
            : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
        }`}
      >
        {post.is_pinned ? "Unpin" : "Pin"}
      </button>
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

    // Create new array with reordered pinned posts
    const newPinnedPosts = [...pinnedPosts];
    const [draggedPost] = newPinnedPosts.splice(draggedIndex, 1);
    newPinnedPosts.splice(dropIndex, 0, draggedPost);

    // Combine with regular posts and call onReorder
    const newPosts = [...newPinnedPosts, ...regularPosts];
    onReorder(newPosts);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Posts</h3>

      {/* Pinned Posts - Draggable */}
      {pinnedPosts.length > 0 && (
        <div className="mb-4">
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
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </div>
      )}

      {/* Regular Posts - Not Draggable */}
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
  );
}
