"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Profile from "./types/profile";

export default function Home() {
  const [data, setData] = useState<Profile | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
    };

    return () => {
      console.log("Closing EventSource");
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-4">Profile</h1>
      <Link href={"/settings"} className="underline text-blue-400">
        Settings
      </Link>
      {data ? (
        <div>
          <h2>{data.display_name}</h2>
          <p>@{data.username}</p>
          <p>{data.bio}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
