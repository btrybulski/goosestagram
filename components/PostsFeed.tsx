import Profile from "@/types/profile";

interface ProfileViewProps {
  profile: Profile;
}

function Post({ data, idx }) {
  return (
    <div
      className={`border p-4 rounded mb-3 bg-white shadow-sm hover:bg-gray-50 cursor-pointer`}
    >
      {data.is_pinned && (
        <span className="inline-block mb-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          📌 Pinned
        </span>
      )}
      <h4 className="font-semibold text-lg">{data.title}</h4>
      <p className="mt-2">{data.body}</p>

      {/*{data.is_pinned ? (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-4">
          Unpin
        </button>
      ) : (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">
          Pin
        </button>
      )}*/}
    </div>
  );
}

export default function PostsFeed({ profile }: ProfileViewProps) {
  const pinnedPosts = profile.posts.filter((p) => p.is_pinned);
  const regularPosts = profile.posts.filter((p) => !p.is_pinned);
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Posts</h3>
      {pinnedPosts.map((data, idx) => (
        <Post data={data} key={idx} idx={idx} />
      ))}
      {regularPosts.map((data, idx) => (
        <Post data={data} key={idx} idx={idx} />
      ))}
    </div>
  );
}
