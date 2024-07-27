export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Todo App",
  description: "A simple todo app built with Next.js and NextUI",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tasks",
      href: "/tasks",
    },
  ],
};
