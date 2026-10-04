import { a as $$Button, $ as $$BaseLayout, r as renderScript, b as $$Icon, k as $$Card, h as config } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent, $ as $$ResponsiveImage } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderComponent, a as renderTemplate, b as addAttribute } from './prerender_DncH_eSz.mjs';
import { g as getCollection } from './_astro_content_C8cOROfu.mjs';
import { $ as $$PostPreview, i as $$Quote } from './PFSearch_DdqBqaCo.mjs';
import { g as getBlogCollection, s as sortMDByDate } from './server_D1JQhB_r.mjs';

const $$SkillLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SkillLayout;
  const { title, skills } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-y-2 md:flex-row md:gap-x-5 md:gap-y-0"> <h3 class="w-1/5 font-medium">${title}</h3> <div class="flex flex-row flex-wrap gap-x-4 gap-y-2 md:w-4/5"> ${skills.map((skill) => renderTemplate`${renderComponent($$result, "Button", $$Button, { "as": "button", "title": skill, "variant": "pill" })}`)} </div> </div>`;
}, "D:/MyBlog/src/components/home/SkillLayout.astro", void 0);

const riseImg = new Proxy({"src":"/_astro/rise.QKKAYIXz.jpg","width":1472,"height":2208,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/MyBlog/src/assets/home/rise.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("D:/MyBlog/src/assets/home/rise.jpg");
							return target[name];
						}
					});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const MAX_POSTS = 6;
  const allPosts = await getBlogCollection();
  const allPostsByDate = sortMDByDate(allPosts).slice(0, MAX_POSTS);
  const MAX_NOTES = 3;
  const allNotes = (await getCollection("notes", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  const latestNotes = allNotes.slice(0, MAX_NOTES);
  const noteDate = (d) => d.toLocaleDateString(config.locale.dateLocale, config.locale.dateOptions);
  const languages = ["Python 学习中", "C 语言"];
  const frontend = ["HTML / CSS / JS 入门", "Astro"];
  const tools = ["VS Code", "Obsidian", "Git"];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": { title: "Home" } }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex w-full flex-col">  <section class="hero" id="hero"> <div class="hero-meta"> <span>Harbin, China</span> <span class="divider"></span> <span>Est. 2026</span> <span class="divider"></span> <span>Edition 1</span> </div> <h1 class="hero-title"> <span class="row"><span>Skavin</span></span> <span class="row"><span class="accent">The Rat</span></span> </h1> <div class="hero-art"> ${renderComponent($$result2, "Image", $$ResponsiveImage, { "src": riseImg, "alt": "Rise 主题插图：向上伸展的手与红色圆日", "widths": [480, 736, 960, 1472], "sizes": "(max-width: 768px) 82vw, 46vw", "loading": "eager", "fetchpriority": "high" })} </div> <p class="hero-sub">
哈尔滨工业大学<strong>智能科学专业</strong>在读，编程初学者。
        这里记录我<strong>学习代码与人工智能</strong>的过程——
        折腾的每一步，都算数。
</p> <div class="hero-cta"> <a class="btn-solid" href="/blog">开始阅读 →</a> <a class="btn-line" href="/about">了解关于我</a> </div> <div class="hero-bottom"> <span>Step Into It</span> <span class="scroll-hint hide-mobile">Scroll</span> <span>Go All In</span> </div> </section>  <section class="home-section reveal"> <div class="section-head"> <h2>About</h2> </div> <p class="statement">
SkavinTheRat 是一名来自哈尔滨的本科生，<br>
主修<em>智能科学</em>，正在学习用代码表达想法。
</p> <div class="connect-row"> <a href="https://space.bilibili.com/2023163677" target="_blank" rel="noopener"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "bilibili", "class": "size-4" })} Bilibili
</a> <a href="mailto:zhao20231459@126.com"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "email", "class": "size-4" })} Email
</a> <a href="mailto:2026110073@stu.hit.edu.cn"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "email", "class": "size-4" })} 学校邮箱
</a> </div> </section>  ${allPostsByDate.length > 0 && renderTemplate`<section class="home-section reveal"> <div class="section-head"> <h2>Posts</h2> ${renderComponent($$result2, "Button", $$Button, { "title": "全部文章", "class": "w-fit", "href": "/blog", "variant": "ahead" })} </div> <ul class="flex flex-col gap-y-1.5 sm:gap-y-2"> ${allPostsByDate.map((p) => renderTemplate`<li class="flex flex-col gap-x-2 sm:flex-row"> ${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": p })} </li>`)} </ul> </section>`}  <section class="home-section reveal"> <div class="section-head"> <h2>随记 · Notes</h2> ${renderComponent($$result2, "Button", $$Button, { "title": "全部随记", "class": "w-fit", "href": "/notes", "variant": "ahead" })} </div> ${latestNotes.length > 0 ? renderTemplate`<div> ${latestNotes.map((note) => renderTemplate`<div class="note-item"> <time${addAttribute(note.data.publishDate.toISOString(), "datetime")}> ${noteDate(note.data.publishDate)} </time> <p>${note.body?.trim().split("\n")[0]}</p> </div>`)} </div>` : renderTemplate`<p class="text-muted-foreground">还没有随记，第一条很快就来。</p>`} </section>  <section class="home-section reveal"> <div class="section-head"> <h2>音乐 · Music</h2> ${renderComponent($$result2, "Button", $$Button, { "title": "进入板块", "class": "w-fit", "href": "/music", "variant": "ahead" })} </div> <a class="music-card" href="/music"> <span class="eq"><i></i><i></i><i></i></span> <span> <span class="block font-medium">最近在听</span> <span class="block text-sm text-muted-foreground">我的听歌记录与歌单，正在整理中 →</span> </span> </a> </section>  <section class="home-section reveal"> <div class="section-head"> <h2>Education</h2> </div> ${renderComponent($$result2, "Card", $$Card, { "as": "a", "heading": "哈尔滨工业大学（本部）", "subheading": "智能科学专业 · 本科在读", "date": "2026 年 9 月入学", "href": "https://www.hit.edu.cn", "target": "_blank" })} </section>  <section class="home-section reveal"> <div class="section-head"> <h2>Skills</h2> </div> <div class="flex flex-col gap-y-3"> ${renderComponent($$result2, "SkillLayout", $$SkillLayout, { "title": "Languages", "skills": languages })} ${renderComponent($$result2, "SkillLayout", $$SkillLayout, { "title": "Frontend", "skills": frontend })} ${renderComponent($$result2, "SkillLayout", $$SkillLayout, { "title": "Tools", "skills": tools })} </div> </section> ${renderComponent($$result2, "Quote", $$Quote, { "class": "my-12" })} </main> ` })}  ${renderScript($$result, "D:/MyBlog/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/src/pages/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
