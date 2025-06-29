import { defineConfig } from "tinacms";
import page from "./collections/page";
import post from "./collections/post";
import project from "./collections/project";

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    "main", // fallback
  token: process.env.NEXT_PUBLIC_TINA_TOKEN || process.env.TINA_TOKEN || "local",
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [page, post, project],
  },
  // Use local mode for admin to avoid CORS issues
  localApi: process.env.NODE_ENV === 'development',
});

// A comment to force a change
export default config;
