import './BaseLayout_xBROlUPS.mjs';
import { c as createComponent, a as config, r as renderEntry } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, F as Fragment, c as renderSlot } from './prerender_DncH_eSz.mjs';
import { s as sortMDByDate, g as getBlogCollection } from './server_D1JQhB_r.mjs';
import { a as $$MediumZoom, b as $$TOC, c as $$Hero, d as $$Copyright, e as $$ArticleBottom } from './PFSearch_DdqBqaCo.mjs';
import { $ as $$ContentLayout, a as $$PageInfo, b as $$Comment } from './PageInfo_C4IBrCcT.mjs';

const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BlogPost;
  const {
    post: { id, data },
    posts,
    headings,
    remarkPluginFrontmatter
  } = Astro2.props;
  const {
    description,
    heroImage,
    publishDate,
    title,
    updatedDate,
    draft: isDraft,
    comment: enableComment
  } = data;
  const socialImage = heroImage ? typeof heroImage.src === "string" ? heroImage.src : heroImage.src.src : config.socialCard;
  const articleDate = updatedDate?.toISOString() ?? publishDate.toISOString();
  const primaryColor = data.heroImage?.color ?? "hsl(var(--primary) / var(--un-text-opacity))";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$ContentLayout, { "meta": { articleDate, description, ogImage: socialImage, title }, "highlightColor": primaryColor, "back": "/blog" }, { "bottom": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "bottom" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Copyright", $$Copyright, { "data": data })} ${renderComponent($$result3, "ArticleBottom", $$ArticleBottom, { "collections": posts, "id": id, "class": "mt-3 sm:mt-6" })} ${!isDraft && enableComment && renderTemplate`${renderComponent($$result3, "Comment", $$Comment, { "class": "mt-3 sm:mt-6" })}`}` })}`, "bottom-sidebar": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["bottom-sidebar"])}`, "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])}   `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Hero", $$Hero, { "data": data, "remarkPluginFrontmatter": remarkPluginFrontmatter, "slot": "header" }, { "description": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "description" }, { "default": ($$result4) => renderTemplate`${!isDraft && enableComment && renderTemplate`${renderComponent($$result4, "PageInfo", $$PageInfo, { "comment": true, "class": "mt-1" })}`}` })}` })}`, "sidebar": ($$result2) => renderTemplate`${!!headings.length && renderTemplate`${renderComponent($$result2, "TOC", $$TOC, { "headings": headings, "slot": "sidebar" })}`}` })} ${renderTemplate`${renderComponent($$result, "MediumZoom", $$MediumZoom, {})}`}`;
}, "D:/MyBlog/src/layouts/BlogPost.astro", void 0);

const prerender = true;
async function getStaticPaths() {
  const posts = sortMDByDate(await getBlogCollection());
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post, posts }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { post, posts } = Astro2.props;
  const { Content, headings, remarkPluginFrontmatter } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "PostLayout", $$BlogPost, { "post": post, "posts": posts, "headings": headings, "remarkPluginFrontmatter": remarkPluginFrontmatter }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "D:/MyBlog/src/pages/blog/[...id].astro", void 0);

const $$file = "D:/MyBlog/src/pages/blog/[...id].astro";
const $$url = "/blog/[...id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
