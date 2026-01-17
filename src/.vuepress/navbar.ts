import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/portfolio",
  "/demo/",
  {
    text: "Java",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "算法",
      icon: "lightbulb",
      prefix: "/guide/",
      children: [
        {
          text: "MySQL",
          icon: "lightbulb",
          prefix: "bar/",
          children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
        },
        {
          text: "Redis",
          icon: "lightbulb",
          prefix: "foo/",
          children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
        },
      ],
  },
  {
    text: "数据库",
      icon: "lightbulb",
      prefix: "/guide/",
      children: [
        {
          text: "MySQL",
          icon: "lightbulb",
          prefix: "bar/",
          children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
        },
        {
          text: "Redis",
          icon: "lightbulb",
          prefix: "foo/",
          children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
        },
      ],
  },
  {
    text: "工具",
      icon: "lightbulb",
      prefix: "/guide/",
      children: [
        {
          text: "Docker",
          icon: "lightbulb",
          prefix: "bar/",
          children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
        },
        {
          text: "Git",
          icon: "lightbulb",
          prefix: "foo/",
          children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
        },
        {
        text: "Linux",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
        },
      ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
