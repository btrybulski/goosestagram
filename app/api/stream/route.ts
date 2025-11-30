import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const filePath = path.join(process.cwd(), "data", "profiles", "ben.json");

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendData = () => {
        try {
          // Check if file exists
          if (!fs.existsSync(filePath)) {
            // Send null to indicate no profile
            controller.enqueue(encoder.encode(`data: null\n\n`));
            return;
          }

          const data = fs.readFileSync(filePath, "utf8");
          // Compress to single line for SSE
          const compactJSON = JSON.stringify(JSON.parse(data));
          const message = `data: ${compactJSON}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (err) {
          console.error("Error:", err);
          controller.enqueue(encoder.encode(`data: null\n\n`));
        }
      };

      sendData();

      // Watch for changes only if file exists
      let watcher: fs.FSWatcher | null = null;
      if (fs.existsSync(filePath)) {
        watcher = fs.watch(filePath, (eventType) => {
          if (eventType === "change") {
            sendData();
          }
        });
      }

      req.signal.addEventListener("abort", () => {
        watcher?.close();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
