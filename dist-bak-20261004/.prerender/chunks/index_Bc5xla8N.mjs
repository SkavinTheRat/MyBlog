import { $ as $$BaseLayout, a as $$Button } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_DncH_eSz.mjs';
import { $ as $$PostPreview } from './PFSearch_DdqBqaCo.mjs';
import { g as getBlogCollection, s as sortMDByDate, a as groupCollectionsByYear } from './server_D1JQhB_r.mjs';

const prerender = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getBlogCollection();
  const allPostsByDate = sortMDByDate(allPosts);
  const allPostsByYear = groupCollectionsByYear(allPostsByDate);
  const meta = {
    description: "A list of all the years of creating my posts",
    title: "Archives"
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "title": "Back", "href": "/blog", "variant": "back" })} ${maybeRenderHead()}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-6 text-3xl font-medium">Archives</h1> </div> ${allPosts.length === 0 && renderTemplate`<p>No posts yet.</p>`} <section id="content" class="animate" aria-label="Blog post list"> ${allPostsByYear.map(([year, posts]) => renderTemplate`<div class="relative mt-20"> <h2 class="absolute -start-6 -top-16 z-0 text-9xl font-bold text-transparent opacity-12 dark:opacity-25" style="-webkit-text-stroke-width:2px;-webkit-text-stroke-color:hsl(var(--foreground)/var(--un-text-opacity))"> <samp>${year}</samp> </h2> <p class="px-5 text-muted-foreground"> ${posts.length} post${posts.length > 1 && "s"} </p> <ul class="flex flex-col text-start"> ${posts.map((p) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": p, "class": "border-0 bg-transparent py-2" })}`)} </ul> </div>`)} </section> </main> ` })}`;
}, "D:/MyBlog/src/pages/archives/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/archives/index.astro";
const $$url = "/archives";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
