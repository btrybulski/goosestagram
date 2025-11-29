import Link from "next/link";

export default function Settings() {
  return (
    <div>
      <h1 className="text-4xl mb-4">Settings</h1>
      <Link href={"/"} className="underline text-blue-400">
        Home
      </Link>
    </div>
  );
}
