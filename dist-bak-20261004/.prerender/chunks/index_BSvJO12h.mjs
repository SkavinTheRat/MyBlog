import { h as config } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent, r as renderEntry } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_DncH_eSz.mjs';
import { g as getCollection } from './_astro_content_C8cOROfu.mjs';
import { $ as $$CommonPage } from './CommonPage_BtRrSOVr.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const notes = (await getCollection("notes", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  const rendered = await Promise.all(
    notes.map(async (note) => {
      const { Content } = await renderEntry(note);
      return { note, Content };
    })
  );
  const fmt = (d) => d.toLocaleDateString(config.locale.dateLocale, config.locale.dateOptions);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, { "title": "随记" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<p class="text-muted-foreground">
短小的想法、即时的记录、不值得成文的碎片。不写长文压力，保持输出习惯。
</p> ${rendered.length === 0 && renderTemplate`<p class="text-muted-foreground mt-6">还没有随记。在 src/content/notes/ 下新建一个 .md 文件就是第一条。</p>`}<div class="mt-6 flex flex-col"> ${rendered.map(({ note, Content }) => renderTemplate`<article class="note-item"> <time${addAttribute(note.data.publishDate.toISOString(), "datetime")}>${fmt(note.data.publishDate)}</time> ${note.data.title && renderTemplate`<h3 class="mt-1 text-lg font-medium">${note.data.title}</h3>`} <div class="prose mt-2 max-w-none text-base"> ${renderComponent($$result2, "Content", Content, {})} </div> ${note.data.tags.length > 0 && renderTemplate`<div class="mt-2 flex gap-x-3"> ${note.data.tags.map((tag) => renderTemplate`<span class="tag text-xs">#${tag}</span>`)} </div>`} </article>`)} </div> ` })}`;
}, "D:/MyBlog/src/pages/notes/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/notes/index.astro";
const $$url = "/notes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
