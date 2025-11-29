// components/NewPostForm.tsx
import { useState } from "react";

interface NewPostFormProps {
  onSubmit: (post: { title: string; body: string; images: string[] }) => void;
  onCancel: () => void;
}

export default function NewPostForm({ onSubmit, onCancel }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!title || !body) {
      alert("Title and body are required");
      return;
    }
    onSubmit({ title, body, images });
  };

  return (
    <div className="mb-6 border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">New Post</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Post title"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="What's on your mind?"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">
            Images (optional, comma-separated URLs)
          </label>
          <input
            type="text"
            value={images.join(", ")}
            onChange={(e) =>
              setImages(
                e.target.value
                  .split(",")
                  .map((url) => url.trim())
                  .filter(Boolean),
              )
            }
            className="w-full p-2 border rounded"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Post
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
