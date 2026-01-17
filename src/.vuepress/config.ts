import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/mmzhangblog/",

  lang: "zh-CN",
  title: "神马都会亿点点的毛毛张",
  description: "技术博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
