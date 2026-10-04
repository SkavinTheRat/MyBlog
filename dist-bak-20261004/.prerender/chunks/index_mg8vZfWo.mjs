import { b as $$Icon, c as cn, d as $$Svg, e as $$Spoiler, a as $$Button, f as $$Collapse, g as $$Timeline } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent, $ as $$ResponsiveImage } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { m as maybeRenderHead, b as addAttribute, r as renderComponent, a as renderTemplate, s as spreadAttributes, F as Fragment } from './prerender_DncH_eSz.mjs';
import { $ as $$CommonPage } from './CommonPage_BtRrSOVr.mjs';

const $$Substats = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Substats;
  const { stats } = Astro2.props;
  async function fetchCount(item) {
    if (!item.api) return;
    try {
      const response = await fetch(`https://api.swo.moe/stats/${item.api}`);
      const data = await response.json();
      if (data.failed) {
        throw new Error(data.message);
      } else {
        item.count = data.count;
      }
    } catch (error) {
      console.error(`Error in Substats fetching: ${error}`);
    }
  }
  await Promise.all(stats.map(fetchCount));
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 gap-3 rounded-xl border p-2 sm:grid-cols-2 sm:p-3"> ${stats.map(({ link, platform, icon, color, count, text }) => renderTemplate`<a class="group text-muted-foreground no-underline"${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer"> <div class="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-all hover:border-border hover:bg-muted"> ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "color": color })}`} <div class="flex-1 text-foreground transition-colors group-hover:text-primary"> ${platform} </div> ${count ? renderTemplate`<div class="flex items-center gap-1.5"> <samp>${count}</samp> <span class="text-sm font-normal">${text}</span> </div>` : "null"} </div> </a>`)} </div> <div class="mt-2 text-right text-sm">
Display real-time; powered by <a class="text-muted-foreground" href="http://github.com/spencerwooo/substats" target="_blank" rel="noopener noreferrer">Substats</a> </div>`;
}, "D:/MyBlog/src/components/about/Substats.astro", void 0);

const $$ToolSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ToolSection;
  const { class: className, title, tools, ...props } = Astro2.props;
  function isImageMetadata(obj) {
    return typeof obj === "object" && obj !== null && "src" in obj;
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cn("not-prose flex flex-col rounded-xl border py-3 px-3 gap-y-3 sm:gap-y-4", className), "class")}${spreadAttributes(props)}> <div class="m-0 px-2 text-lg font-medium">${title}</div> <div class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2"> ${tools.map((tool) => renderTemplate`<a class="group relative text-sm leading-normal no-underline"${addAttribute(tool.href, "href")}${addAttribute(tool.name, "id")} target="_blank"> <div class="flex items-center gap-x-3 rounded-lg border border-transparent px-1.5 py-1 transition-colors hover:border-border hover:bg-muted"> ${tool.darkIcon ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${isImageMetadata(tool.icon) ? renderTemplate`<div class="size-10 rounded-lg bg-card p-2 dark:hidden"> ${renderComponent($$result2, "Image", $$ResponsiveImage, { "src": tool.icon, "alt": tool.name, "class": "h-full w-full object-contain" })} </div>` : renderTemplate`${renderComponent($$result2, "Svg", $$Svg, { "src": tool.icon, "class": "size-10 rounded-lg bg-card fill-foreground p-2 dark:hidden" })}`}${isImageMetadata(tool.darkIcon) ? renderTemplate`<div class="size-10 rounded-lg bg-card p-2 hidden dark:block"> ${renderComponent($$result2, "Image", $$ResponsiveImage, { "src": tool.darkIcon, "alt": tool.name, "class": "h-full w-full object-contain" })} </div>` : renderTemplate`${renderComponent($$result2, "Svg", $$Svg, { "src": tool.darkIcon, "class": "size-10 rounded-lg bg-card fill-foreground p-2 hidden dark:block" })}`}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${isImageMetadata(tool.icon) ? renderTemplate`<div class="size-10 rounded-lg bg-card p-2"> ${renderComponent($$result2, "Image", $$ResponsiveImage, { "src": tool.icon, "alt": tool.name, "class": "h-full w-full object-contain" })} </div>` : renderTemplate`${renderComponent($$result2, "Svg", $$Svg, { "src": tool.icon, "class": "size-10 rounded-lg bg-card fill-foreground p-2" })}`}` })}`} <div class="z-20 flex flex-col"> <div class="font-medium text-foreground">${tool.name}</div> <div class="font-normal">${tool.description}</div> </div> </div> </a>`)} </div> </div>`;
}, "D:/MyBlog/src/components/about/ToolSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const headings = [
    { depth: 2, slug: "hobbies", text: "Hobbies" },
    { depth: 2, slug: "tools", text: "Tools" },
    { depth: 2, slug: "social-networks", text: "Social Networks" },
    { depth: 2, slug: "gossips", text: "Gossips" },
    { depth: 2, slug: "about-blog", text: "About Blog" }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, { "title": "About", "headings": headings }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Student / Beginner Programmer</p> <p>
哈尔滨工业大学（本部）智能科学专业 2026 级本科生。编程初学者，正在学习 Python
    与 Web 开发，对人工智能的一切都抱有好奇。这个网站记录我的学习轨迹——
    折腾的每一步，都算数。
</p> <p>
Motto: 日拱一卒，功不唐捐。${renderComponent($$result2, "Spoiler", $$Spoiler, {}, { "default": ($$result3) => renderTemplate`网名由来见下方 Gossips。` })} </p> ${renderComponent($$result2, "Button", $$Button, { "title": "回到首页", "class": "w-fit", "href": "/", "variant": "ahead" })} <h2 id="hobbies">Hobbies</h2> <ul> <li><b>Coding</b>：正在从 Python 入门编程，编辑器用 VS Code。</li> <li><b>Game</b>：星际公民（Star Citizen）等 PC 游戏玩家。</li> <li><b>Music</b>：听歌记录与歌单正在整理，见<a href="/music">音乐板块</a>。</li> <li><b>Notes</b>：用 Obsidian 管理学习笔记，零碎想法写在本站的<a href="/notes">随记</a>里。</li> </ul> <h2 id="tools">Tools</h2> <p>我目前在用的装备与工具：</p> ${renderComponent($$result2, "ToolSection", $$ToolSection, { "class": "mb-5", "title": "Development", "tools": [
    {
      name: "VS Code",
      description: "IDE",
      href: "https://code.visualstudio.com/",
      icon: import('./vscode_RrzjPKQS.mjs')
    },
    {
      name: "Typora",
      description: "Markdown Editor",
      href: "https://typora.io/",
      icon: import('./typora_CoxVpXCB.mjs')
    },
    {
      name: "ChatGPT",
      description: "AI Assistant",
      href: "https://chatgpt.com/",
      icon: import('./chatgpt_r_JZcElK.mjs')
    }
  ] })} ${renderComponent($$result2, "ToolSection", $$ToolSection, { "class": "mb-5", "title": "Productivity", "tools": [
    {
      name: "Chrome",
      description: "Browser",
      href: "https://www.google.com/chrome/",
      icon: import('./chrome_IeV039iH.mjs')
    },
    {
      name: "Notion",
      description: "Note Taking",
      href: "https://www.notion.so/",
      icon: import('./notion_CCmRCukG.mjs')
    }
  ] })} ${renderComponent($$result2, "ToolSection", $$ToolSection, { "class": "mb-5", "title": "Environment", "tools": [
    {
      name: "Windows 11",
      description: "主力系统",
      href: "https://www.microsoft.com/windows/windows-11",
      icon: import('./windows11_CCF29cKn.mjs')
    }
  ] })} <h2 id="social-networks">Social Networks</h2> <p>可以在这些地方找到我（数据由 Substats 实时聚合）：</p> ${renderComponent($$result2, "Substats", $$Substats, { "stats": [
    {
      platform: "Bilibili",
      icon: "bilibili",
      color: "#fb7299",
      link: "https://space.bilibili.com/2023163677",
      text: "fans",
      api: "bilibili/2023163677"
    }
  ] })} <ul> <li>Email：<a href="mailto:zhao20231459@126.com">zhao20231459@126.com</a></li> <li>学校邮箱：<a href="mailto:2026110073@stu.hit.edu.cn">2026110073@stu.hit.edu.cn</a></li> </ul> <h2 id="gossips">Gossips</h2> ${renderComponent($$result2, "Collapse", $$Collapse, { "title": "为什么叫 SkavinTheRat？" }, { "default": ($$result3) => renderTemplate`
这个名字背后有一个故事，等我找个时间把它写下来……（在
<code>src/pages/about/index.astro</code> 中编辑这一段）
` })} <h2 id="about-blog">About Blog</h2> <p>网站历史（从第一天开始记录）：</p> ${renderComponent($$result2, "Timeline", $$Timeline, { "events": [
    {
      date: "2026-10-04",
      content: '网站破土动工：基于 <a href="https://astro.build/" target="_blank">Astro</a> 与 <a href="https://github.com/cworld1/astro-theme-pure" target="_blank">Astro Theme Pure</a> 完成本地化定制，确定了米色 + 海报橙的视觉系统'
    }
  ] })} <p>本站的顺利运行离不开以下优秀项目与服务的支持：</p> <ul> <li>
Framework & Theme: <a href="https://astro.build/" target="_blank">Astro</a> + <a href="https://github.com/cworld1/astro-theme-pure" target="_blank">Astro Theme Pure</a> </li> <li>
Site hosting: <a href="https://vercel.com/" target="_blank">Vercel</a> </li> <li>Comment system: <a href="https://waline.js.org" target="_blank">Waline</a>（待部署后开启）</li> <li>
Statistics: <a href="https://github.com/spencerwooo/substats" target="_blank">Substats</a> </li> <li>Quotes: <a href="https://hitokoto.cn/" target="_blank">一言</a></li> </ul> ` })}`;
}, "D:/MyBlog/src/pages/about/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/about/index.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
