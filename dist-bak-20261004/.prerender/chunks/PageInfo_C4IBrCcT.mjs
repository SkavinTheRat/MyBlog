import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, c as renderSlot, b as addAttribute, s as spreadAttributes, F as Fragment } from './prerender_DncH_eSz.mjs';
import { $ as $$BaseLayout, r as renderScript, a as $$Button, c as cn, i as integ, b as $$Icon, h as config } from './BaseLayout_xBROlUPS.mjs';
import { g as $$BackToTop } from './PFSearch_DdqBqaCo.mjs';
import 'clsx';

const $$ContentLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ContentLayout;
  const { meta, highlightColor, back = "/", ...props } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": meta, "highlightColor": highlightColor, ...props, "class": "astro-scuu7fyy" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "title": "Back", "href": back, "variant": "back", "class": "astro-scuu7fyy" })} ${maybeRenderHead()}<main class="mt-6 items-start gap-x-10 md:flex astro-scuu7fyy">  <aside class="animate top-20 min-w-48 basis-60 overflow-y-scroll max-md:hidden z-40 fixed md:sticky md:order-2 lg:shrink-0 max-md:border max-md:px-4 max-md:py-3 max-md:bg-muted max-md:rounded-xl astro-scuu7fyy" style="height:calc(100vh - 7rem);" id="sidebar"> ${renderSlot($$result2, $$slots["sidebar"])} </aside> <div id="sidebar-shade" class="fixed top-0 start-0 w-full h-full astro-scuu7fyy" style="display:none;background-color:#00000091;z-index:31"></div> <article data-pagefind-body class="min-w-0 grow astro-scuu7fyy">  <div id="content-header" class="animate astro-scuu7fyy"> ${renderSlot($$result2, $$slots["header"])} </div>  <div id="content"${addAttribute((cn(
    "max-w-none animate mt-8 md:min-w-[45ch] overflow-x-hidden",
    integ.typography.class
  ) ?? "") + " astro-scuu7fyy", "class")}> ${renderSlot($$result2, $$slots["default"])} </div> </article> </main> <div class="bottom mt-6 items-start gap-x-10 md:flex astro-scuu7fyy">  <div class="flex-1 text-muted-foreground md:min-w-[50ch] astro-scuu7fyy"> ${renderSlot($$result2, $$slots["bottom"])} </div> <div class="min-w-48 basis-60 astro-scuu7fyy"> ${renderSlot($$result2, $$slots["bottom-sidebar"])} </div> </div> ${renderComponent($$result2, "BackToTop", $$BackToTop, { "header": "content-header", "content": "content", "class": "astro-scuu7fyy" }, { "other-icons": ($$result3) => renderTemplate`<button aria-label="Toggle sidebar" class="size-10 flex items-center justify-center rounded-full border-2 border-transparent bg-muted text-muted-foreground duration-300 hover:border-border/75 md:hidden sm:size-12 astro-scuu7fyy" id="sidebar-btn"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "list", "class": "astro-scuu7fyy" })} </button>` })} ` })} ${renderScript($$result, "D:/MyBlog/src/layouts/ContentLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/src/layouts/ContentLayout.astro", void 0);

const $$Comment = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Comment;
  const { class: className } = Astro2.props;
  return renderTemplate`${config.integ.waline.enable}${renderScript($$result, "D:/MyBlog/src/components/waline/Comment.astro?astro&type=script&index=0&lang.ts")}${renderTemplate`<style> #waline :global(.wl-meta) { display: none; } </style>`}`;
}, "D:/MyBlog/src/components/waline/Comment.astro", void 0);

const $$PageInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PageInfo;
  const { comment, class: className, ...props } = Astro2.props;
  const path = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cn("text-base text-sm text-muted-foreground", className), "class")} id="walinePageInfo"${addAttribute(config.integ.waline.server, "data-server-url")}${addAttribute(comment ? "true" : "false", "data-comment")}${spreadAttributes(props)}> <span class="waline-pageview-count"${addAttribute(path, "data-path")}></span> views
${comment && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${" | "}<a href="#waline"> <span class="waline-comment-count"${addAttribute(path, "data-path")}></span> comments
</a> ` })}`} </div> ${renderScript($$result, "D:/MyBlog/src/components/waline/PageInfo.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/src/components/waline/PageInfo.astro", void 0);

export { $$ContentLayout as $, $$PageInfo as a, $$Comment as b };
