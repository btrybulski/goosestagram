// app/api/update/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'profiles', 'ben.json');

    // Write with pretty formatting (2 spaces)
    // Note: SSE will compress it to single line when streaming
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return Response.json({ success: true });
  } catch (err) {
    console.error('Error writing file:', err);
    return Response.json(
      { error: 'Failed to write file' },
      { status: 500 }
    );
  }
}
