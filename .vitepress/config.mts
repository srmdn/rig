import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Rig",
  description: "Community wiki for OpenCode & oMO — agent pipeline, skills ecosystem, playbooks, and setup guides.",

  lang: "en-US",
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:site", content: "@srmdn" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Rig — OpenCode & oMO Community Wiki" }],
    ["meta", { property: "og:description", content: "Agent pipeline, skills ecosystem, playbooks, and setup guides for OpenCode and oh-my-openagent." }],
  ],

  themeConfig: {
    siteTitle: "Rig",

    nav: [
      { text: "Getting Started", link: "/getting-started/" },
      { text: "Pipeline", link: "/pipeline/" },
      { text: "Skills", link: "/skills/" },
      { text: "Playbooks", link: "/playbooks/" },
      { text: "Reference", link: "/reference/" },
      { text: "Community", link: "/community/" },
    ],

    sidebar: {
      "/getting-started/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/getting-started/" },
            { text: "Install OpenCode", link: "/getting-started/install-opencode" },
            { text: "Install oMO", link: "/getting-started/install-omo" },
            { text: "Your First Session", link: "/getting-started/first-session" },
          ],
        },
      ],
      "/pipeline/": [
        {
          text: "The oMO Pipeline",
          items: [
            { text: "Overview", link: "/pipeline/" },
            { text: "Prometheus — Planner", link: "/pipeline/prometheus" },
            { text: "Atlas — Orchestrator", link: "/pipeline/atlas" },
            { text: "Sisyphus — Executor", link: "/pipeline/sisyphus" },
            { text: "Oracle — Consultant", link: "/pipeline/oracle" },
            { text: "Category Agents", link: "/pipeline/categories" },
          ],
        },
      ],
      "/skills/": [
        {
          text: "Skills Ecosystem",
          items: [
            { text: "Overview", link: "/skills/" },
            { text: "Built-in Skills", link: "/skills/built-in" },
            { text: "Category System", link: "/skills/categories" },
            { text: "Matt Pocock Skills", link: "/skills/matt-pocock" },
            { text: "MCP Integration", link: "/skills/mcp" },
            { text: "Create Your Own", link: "/skills/create" },
          ],
        },
      ],
      "/playbooks/": [
        {
          text: "Playbooks",
          items: [
            { text: "Overview", link: "/playbooks/" },
            { text: "Start a New Project", link: "/playbooks/new-project" },
            { text: "Add a Feature", link: "/playbooks/add-feature" },
            { text: "Debug a Bug", link: "/playbooks/debug" },
            { text: "Refactor with Grill", link: "/playbooks/refactor-grill" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [
            { text: "Overview", link: "/reference/" },
            { text: "Config (oh-my-openagent.json)", link: "/reference/config" },
            { text: "Model Selection", link: "/reference/models" },
            { text: "Agent Settings", link: "/reference/agents" },
            { text: "Category Settings", link: "/reference/categories" },
            { text: "FAQ", link: "/reference/faq" },
          ],
        },
      ],
      "/community/": [
        {
          text: "Community",
          items: [
            { text: "Overview", link: "/community/" },
            { text: "Contribute to Rig", link: "/community/contribute" },
            { text: "Share Your Config", link: "/community/share-config" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/srmdn/rig" },
    ],

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/srmdn/rig/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Built with VitePress. Contribute on GitHub.",
      copyright: "MIT License",
    },
  },
});
