import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
const app = new Hono();
const CAPSULE_PREFIX = "capsule:";
const AUDIO_BUCKET = "make-f774be72-capsule-audio";

const supabase = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f774be72/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/make-server-f774be72/capsules", async (c) => {
  try {
    const capsules = await kv.getByPrefix(CAPSULE_PREFIX);
    capsules.sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    );
    return c.json({ capsules });
  } catch (error) {
    console.log("Error loading capsules:", error);
    return c.json({ error: "No se pudieron cargar las cápsulas." }, 500);
  }
});

app.post("/make-server-f774be72/capsules", async (c) => {
  try {
    const form = await c.req.formData();
    const title = String(form.get("title") ?? "").trim();
    const summary = String(form.get("summary") ?? "").trim();
    const category = String(form.get("category") ?? "").trim();
    const type = String(form.get("type") ?? "").trim();
    const duration = String(form.get("duration") ?? "").trim();
    const audio = form.get("audio");

    if (!title || !summary || !category || !type) {
      return c.json({ error: "Faltan campos obligatorios." }, 400);
    }
    if (type === "Audio" && !(audio instanceof File)) {
      return c.json({ error: "La cápsula necesita un archivo de audio." }, 400);
    }

    const id = crypto.randomUUID();
    let audioUrl: string | undefined;

    if (audio instanceof File) {
      if (!audio.type.startsWith("audio/")) {
        return c.json({ error: "El archivo adjunto no es un audio válido." }, 400);
      }
      if (audio.size > 50 * 1024 * 1024) {
        return c.json({ error: "El audio no puede superar los 50 MB." }, 400);
      }

      const client = supabase();
      const { data: bucket } = await client.storage.getBucket(AUDIO_BUCKET);
      if (!bucket) {
        const { error: bucketError } = await client.storage.createBucket(
          AUDIO_BUCKET,
          { public: true, fileSizeLimit: 50 * 1024 * 1024 },
        );
        if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) {
          throw bucketError;
        }
      }

      const extension = audio.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "webm";
      const filePath = `${id}/audio.${extension}`;
      const { error: uploadError } = await client.storage
        .from(AUDIO_BUCKET)
        .upload(filePath, audio, { contentType: audio.type, upsert: false });
      if (uploadError) throw uploadError;
      audioUrl = client.storage.from(AUDIO_BUCKET).getPublicUrl(filePath).data.publicUrl;
    }

    const capsule = {
      id,
      name: "Alex Martín",
      role: "Personas & Cultura · Novacorp",
      avatar:
        "https://images.unsplash.com/photo-1624245532111-8f4aba352ba9?auto=format&fit=crop&w=180&q=85",
      title,
      summary,
      type,
      duration: duration || (type === "Caso" ? "3 min" : "2:00"),
      category,
      tags: [category.replaceAll(" ", ""), type],
      likes: 0,
      comments: 0,
      time: "Ahora",
      featured: false,
      audioUrl,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`${CAPSULE_PREFIX}${id}`, capsule);
    return c.json({ capsule }, 201);
  } catch (error) {
    console.log("Error creating capsule:", error);
    return c.json({ error: "No se pudo guardar la cápsula ni su archivo." }, 500);
  }
});

Deno.serve(app.fetch);
