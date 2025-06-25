/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "string",
      label: "Excerpt",
      name: "excerpt",
      description: "A brief summary of the post",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
      required: true,
    },
    {
      type: "string",
      label: "Author",
      name: "author",
      defaultValue: "Adam",
    },
    {
      type: "image",
      label: "Featured Image",
      name: "featuredImage",
    },
    {
      type: "string",
      label: "Blog Post Body",
      name: "body",
      ui: {
        component: "textarea",
      },
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/blog/${document._sys.filename}`;
    },
  },
}; 