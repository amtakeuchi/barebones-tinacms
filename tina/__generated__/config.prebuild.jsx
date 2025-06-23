// tina/config.js
import { defineConfig } from "tinacms";

// tina/collections/page.js
var page_default = {
  label: "Page Content",
  name: "page",
  path: "content/page",
  format: "mdx",
  fields: [
    {
      name: "body",
      label: "Main Content",
      type: "rich-text",
      isBody: true
    }
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return void 0;
    }
  }
};

// tina/collections/post.js
var post_default = {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true
    },
    {
      type: "string",
      label: "Excerpt",
      name: "excerpt",
      description: "A brief summary of the post",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
      required: true
    },
    {
      type: "string",
      label: "Author",
      name: "author",
      defaultValue: "Adam"
    },
    {
      type: "image",
      label: "Featured Image",
      name: "featuredImage"
    },
    {
      type: "rich-text",
      label: "Blog Post Body",
      name: "body",
      isBody: true
    }
  ],
  ui: {
    router: ({ document }) => {
      return `/blog/${document._sys.filename}`;
    }
  }
};

// tina/config.js
var config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
  "main",
  // fallback
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
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin"
    // within the public folder
  },
  schema: {
    collections: [page_default, post_default]
  },
  // Use local mode for admin to avoid CORS issues
  localApi: true
});
var config_default = config;
export {
  config,
  config_default as default
};
