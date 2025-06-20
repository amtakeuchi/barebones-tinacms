/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Projects",
  name: "project",
  path: "content/project",
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
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Technologies",
      name: "technologies",
      description: "Comma-separated list of technologies used",
    },
    {
      type: "string",
      label: "GitHub URL",
      name: "githubUrl",
    },
    {
      type: "string",
      label: "Live Demo URL",
      name: "demoUrl",
    },
    {
      type: "image",
      label: "Featured Image",
      name: "featuredImage",
    },
    {
      type: "boolean",
      label: "Featured Project",
      name: "featured",
      description: "Mark this project as featured to show it prominently",
    },
    {
      name: "body",
      label: "Project Details",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
  },
}; 