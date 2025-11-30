import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return Response.json({ error: "Username required" }, { status: 400 });
    }

    const dirPath = path.join(process.cwd(), "data", "profiles");
    const filePath = path.join(dirPath, "ben.json");

    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Check if profile already exists
    if (fs.existsSync(filePath)) {
      return Response.json(
        { error: "Profile already exists" },
        { status: 400 },
      );
    }

    // Create default profile
    const defaultProfile = {
      username,
      display_name: username,
      profile_photo: "",
      bio: "",
      theme: "light",
      onboarding_completed: false,
      links: {
        website: "",
        linkedin: "",
        facebook: "",
        youtube: "",
        x: "",
      },
      posts: [],
    };

    fs.writeFileSync(filePath, JSON.stringify(defaultProfile, null, 2));

    return Response.json({ success: true, profile: defaultProfile });
  } catch (err) {
    console.error("Error creating profile:", err);
    return Response.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
}
