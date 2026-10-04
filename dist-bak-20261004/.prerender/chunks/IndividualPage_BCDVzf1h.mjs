import { c as createComponent, a as config } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, c as renderSlot } from './prerender_DncH_eSz.mjs';
import { b as $$TOC, g as $$BackToTop } from './PFSearch_DdqBqaCo.mjs';
import { $ as $$BaseLayout, a as $$Button, b as $$Icon, c as cn } from './BaseLayout_xBROlUPS.mjs';

const $$IndividualPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$IndividualPage;
  const { frontmatter, headings } = Astro2.props;
  const { title, description, heroImage, language, back } = frontmatter;
  const socialImage = heroImage?.src ?? config.socialCard;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": { title, description, ogImage: socialImage } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "title": "Back", "href": back ?? "/", "variant": "back" })} ${maybeRenderHead()}<main class="mt-6 items-start gap-x-10 md:flex lg:mt-10"> ${!!headings.length && renderTemplate`${renderComponent($$result2, "TOC", $$TOC, { "class": "animate top-24 min-w-48 basis-60 max-md:hidden md:sticky md:order-2 lg:shrink-0", "headings": headings })}`} <article class="min-w-0 data-pagefind-body grow"> <div id="content-header" class="animate"> <h1 class="text-2xl font-medium sm:mb-2 sm:text-3xl"> ${title} </h1> <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-muted-foreground"> ${// Language
  language && renderTemplate`<span class="flex items-center gap-1"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "earth" })} ${language} </span>`} ${// Description
  description && renderTemplate`<blockquote class="text-sm italic text-muted-foreground"> <q>${description}</q> </blockquote>`} </div> </div> <div id="content"${addAttribute(cn(
    "animate mt-8 max-w-none md:min-w-[45ch] overflow-x-hidden",
    config.integ.typography.class
  ), "class")}> ${renderSlot($$result2, $$slots["default"])} </div> </article> </main> ${renderComponent($$result2, "BackToTop", $$BackToTop, { "header": "content-header", "content": "content" })} ` })}`;
}, "D:/MyBlog/src/layouts/IndividualPage.astro", void 0);

export { $$IndividualPage as $ };
