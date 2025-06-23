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
      description: "A brief description of the project",
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
      label: "Project URL",
      name: "projectUrl",
      description: "Link to the live project (optional)",
    },
    {
      type: "string",
      label: "GitHub URL",
      name: "githubUrl",
      description: "Link to the GitHub repository (optional)",
    },
    {
      type: "list",
      label: "Technologies",
      name: "technologies",
      description: "Technologies used in this project",
      list: "string",
    },
    {
      type: "rich-text",
      label: "Project Details",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
  },
}; 