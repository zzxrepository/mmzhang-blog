import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/portfolio",
  "/demo/",
  {
    text: "Java",
    icon: "lightbulb",
    prefix: "/JavaGuide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        link: "/guide/bar/",
      },
      {
        text: "Foo",
        icon: "lightbulb",
        link: "/guide/foo/",
      },
    ],
  },
  {
    text: "算法",
      icon: "lightbulb",
      prefix: "/algroithm/",
      children: [
        {
          text: "MySQL",
          icon: "lightbulb",
          link: "/guide/mysql/",
        },
        {
          text: "Redis",
          icon: "lightbulb",
          link: "/guide/redis/",
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
          link: "/guide/mysql/",
        },
        {
          text: "Redis",
          icon: "lightbulb",
          link: "/guide/redis/",
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
          link: "/guide/mysql/",
        },
        {
          text: "Git",
          icon: "lightbulb",
          link: "/guide/mysql/",
        },
        {
        text: "Linux",
        icon: "lightbulb",
        link: "/guide/mysql/",
        },
      ],
  },
  {
    text: "AI助手",
    icon: "robot",
    children: [
      {
        text: "通用大模型",
        icon: "brain",
        children: [ 
          { text: "ChatGPT", link: "https://chatgpt.com/" },
          { text: "Gemini", link: "https://gemini.google.com/" },
          { text: "Claude", link: "https://claude.ai/" },
          { text: "DeepSeek", link: "https://chat.deepseek.com/" },
          { text: "Kimichat", link: "https://www.moonshot.cn/" }, 
          { text: "豆包", link: "https://www.doubao.com/" }, 
          { text: "元宝", link: "https://yuanbao.tencent.com/" }, 
          { text: "通义千问", link: "https://qianwen.aliyun.com/" },
          { text: "质谱清言", link: "https://chatglm.cn/" }, 
          { text: "文心一言", link: "https://yiyan.baidu.com/" },
          { text: "讯飞星火", link: "https://xinghuo.xfyun.cn/" },
          { text: "问小白", link: "https://www.wenxiaobai.com/" }, 
          { text: "HuggingFace", link: "https://huggingface.co/" },
          { text: "ModelScope", link: "https://modelscope.cn/" },
        ],
      },
    ],
  },
  {
    text: "云服务",
    icon: "cloud",
    children: [
      {
        text: "云厂商",
        icon: "server",
        children: [
          { text: "阿里云", link: "https://www.aliyun.com/" },
          { text: "阿里百炼", link: "https://bailian.console.aliyun.com/" },
          { text: "火山引擎", link: "https://www.volcengine.com/" },
          { text: "华为云", link: "https://www.huaweicloud.com/" },
          { text: "京东云", link: "https://www.jdcloud.com/" },
        ],
      },
    ],
  },
  {
    text: "VuePress Theme Hope 主页",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
