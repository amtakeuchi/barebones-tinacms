/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Projects",
  name: "project",
  path: "content/projects",
  format: "md",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Project Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "category",
      label: "Category",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Thumbnail Image",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "liveLink",
      label: "Live Site Link",
    },
    {
      type: "string",
      name: "repoLink",
      label: "Repository Link",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
  },
}; 