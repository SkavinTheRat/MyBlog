import { h as config, $ as $$BaseLayout, a as $$Button } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_DncH_eSz.mjs';
import { $ as $$PostPreview, f as $$Paginator } from './PFSearch_DdqBqaCo.mjs';
import { g as getBlogCollection, s as sortMDByDate, c as getUniqueTags } from './server_D1JQhB_r.mjs';

const prerender = true;
const getStaticPaths = async ({ paginate }) => {
  const allPosts = await getBlogCollection();
  const allPostsByDate = sortMDByDate(allPosts);
  const uniqueTags = getUniqueTags(allPostsByDate);
  return uniqueTags.flatMap((tag) => {
    const filterPosts = allPostsByDate.filter((post) => post.data.tags.includes(tag));
    return paginate(filterPosts, {
      pageSize: config.content.blogPageSize,
      params: { tag }
    });
  });
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const { tag } = Astro2.params;
  const meta = {
    description: `View all posts with the tag - ${tag}`,
    title: `Tag: ${tag}`
  };
  const paginationProps = {
    ...page.url.prev && {
      prevUrl: {
        text: `← Previous Tags`,
        url: page.url.prev
      }
    },
    ...page.url.next && {
      nextUrl: {
        text: `Next Tags →`,
        url: page.url.next
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "title": "Back", "href": "/blog", "variant": "back" })} ${maybeRenderHead()}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-6 flex items-end gap-x-2 text-3xl font-medium">
Tags:
<span class="text-2xl">#${tag}</span> </h1> </div> <section id="content" class="animate" aria-label="Blog post list"> <ul class="flex flex-col gap-y-3 text-start"> ${page.data.map((post) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": post, "detailed": true })}`)} </ul> ${renderComponent($$result2, "Paginator", $$Paginator, { ...paginationProps })} </section> </main> ` })}`;
}, "D:/MyBlog/src/pages/tags/[tag]/[...page].astro", void 0);

const $$file = "D:/MyBlog/src/pages/tags/[tag]/[...page].astro";
const $$url = "/tags/[tag]/[...page]";

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
