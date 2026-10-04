import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead, c as renderSlot } from './prerender_DncH_eSz.mjs';
import { b as $$TOC } from './PFSearch_DdqBqaCo.mjs';
import { $ as $$ContentLayout, a as $$PageInfo, b as $$Comment } from './PageInfo_C4IBrCcT.mjs';

const $$CommonPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CommonPage;
  const { title, headings, view, comment: enableComment, ...props } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$ContentLayout, { "meta": { title }, ...props }, { "bottom": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["bottom"], renderTemplate` ${enableComment && renderTemplate`${renderComponent($$result2, "Comment", $$Comment, { "class": "mt-3 sm:mt-6" })}`} `)}`, "bottom-sidebar": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["bottom-sidebar"])}`, "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])}   `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-medium sm:mb-2 sm:text-3xl">${title}</h1> ${view && renderTemplate`${renderComponent($$result3, "PageInfo", $$PageInfo, { "comment": enableComment, "class": "italic" })}`}` })}`, "sidebar": ($$result2) => renderTemplate`${headings?.length && renderTemplate`${renderComponent($$result2, "TOC", $$TOC, { "headings": headings, "slot": "sidebar" })}`}` })}`;
}, "D:/MyBlog/src/layouts/CommonPage.astro", void 0);

export { $$CommonPage as $ };
