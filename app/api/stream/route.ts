// app/api/stream/route.js
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const filePath = path.join(process.cwd(), "data", "ben.json");

  let watcher;

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  const sendData = async () => {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const compactJSON = JSON.stringify(JSON.parse(data));
      const message = `data: ${compactJSON}\n\n`;
      await writer.write(encoder.encode(message));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Send initial data
  sendData();

  // Watch for changes
  watcher = fs.watch(filePath, (eventType) => {
    if (eventType === "change") {
      sendData();
    }
  });

  // Cleanup on abort
  req.signal.addEventListener("abort", () => {
    watcher?.close();
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
