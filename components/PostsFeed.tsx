// components/PostsFeed.tsx
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
}

function PostCard({
  post,
  index,
  onTogglePin,
}: {
  post: Post;
  index: number;
  onTogglePin: (index: number) => void;
}) {
  return (
    <div className="border p-4 rounded mb-3 bg-white shadow-sm hover:bg-gray-50 flex justify-between items-start">
      <div className="flex justify-start flex-1">
        {post.image && (
          <div className="mr-8 flex-shrink-0">
            <img
              src={post.image}
              alt=""
              className="w-60 h-auto rounded object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          {post.is_pinned && (
            <span className="inline-block mb-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              📌 Pinned
            </span>
          )}
          <h4 className="font-semibold text-lg">{post.title}</h4>
          <p className="mt-2 text-gray-700">{post.body}</p>
        </div>
      </div>
      <button
        onClick={() => onTogglePin(index)}
        className={`ml-4 px-3 py-1 text-sm rounded flex-shrink-0 ${
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
}: PostsFeedProps) {
  if (posts.length === 0) {
    return <EmptyState onCreatePost={onCreatePost} />;
  }

  const pinnedPosts = posts.filter((p) => p.is_pinned);
  const regularPosts = posts.filter((p) => !p.is_pinned);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Posts</h3>
      {pinnedPosts.map((post, idx) => {
        const originalIndex = posts.indexOf(post);
        return (
          <PostCard
            key={`pinned-${idx}`}
            post={post}
            index={originalIndex}
            onTogglePin={onTogglePin}
          />
        );
      })}
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
