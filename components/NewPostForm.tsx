// components/NewPostForm.tsx
import { useState, useRef } from "react";

interface NewPostFormProps {
  onSubmit: (post: { title: string; body: string; image: string }) => void;
  onCancel: () => void;
}

export default function NewPostForm({ onSubmit, onCancel }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !body) {
      alert("Title and body are required");
      return;
    }
    onSubmit({ title, body, image });
  };

  return (
    <div className="mb-6 border rounded-lg p-4 sm:p-6 bg-white shadow-sm max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">New Post</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold text-sm sm:text-base">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-sm sm:text-base"
            placeholder="Post title"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-sm sm:text-base">
            Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 sm:h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors overflow-hidden"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500 px-4">
                <svg
                  className="mx-auto h-10 sm:h-12 w-10 sm:w-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-xs sm:text-sm">Click to upload an image</p>
                <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
          {image && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImage("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="mt-2 text-xs sm:text-sm text-red-500 hover:text-red-700"
            >
              Remove image
            </button>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-sm sm:text-base">
            Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded h-24 sm:h-32 text-sm sm:text-base"
            placeholder="What's on your mind?"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
