import { $ as $$BaseLayout, a as $$Button, c as cn, i as integ, j as $$CardList, t as terms } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_DncH_eSz.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const meta = {
    title: "Site policy",
    description: "Site policy documentation"
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "title": "Back", "href": "/", "variant": "back" })} ${maybeRenderHead()}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-6 text-3xl font-medium">Site Policy</h1> </div> <div id="content"${addAttribute(cn("animate mt-8 max-w-none md:min-w-[45ch]", integ.typography.class), "class")}> <h2 class="text-xl font-medium">Site policy documentation</h2> ${renderComponent($$result2, "CardList", $$CardList, { ...terms })} <h2 class="text-xl font-medium">Help Information</h2> <p>You need to add md files in this directory.</p> </div> </main> ` })}`;
}, "D:/MyBlog/src/pages/terms/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/terms/index.astro";
const $$url = "/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
