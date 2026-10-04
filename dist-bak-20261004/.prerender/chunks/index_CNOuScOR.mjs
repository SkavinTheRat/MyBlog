import { f as $$Collapse, g as $$Timeline } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent, $ as $$ResponsiveImage, a as config } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { m as maybeRenderHead, b as addAttribute, a as renderTemplate, s as spreadAttributes, r as renderComponent, F as Fragment } from './prerender_DncH_eSz.mjs';
import { $ as $$CommonPage } from './CommonPage_BtRrSOVr.mjs';

const friends = [{"id_name":"cf-links","desc":"Common links included in circle friends","link_list":[]},{"id_name":"inactive-links","desc":"Inactive or rule-breaking friends","link_list":[]},{"id_name":"special-links","desc":"Other special links","link_list":[]}];
const links = {
  friends,
};

const $$FriendList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FriendList;
  function shuffle(arr) {
    return arr.sort(() => {
      return Math.random() - 0.5;
    });
  }
  const { title, list: friendList, ...props } = Astro2.props;
  const getAvatarSrc = (friend) => friend.avatar;
  return renderTemplate`${title && renderTemplate`${maybeRenderHead()}<h2${addAttribute(friendList.id_name, "id")}>${title}</h2>`}<div class="grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"${spreadAttributes(props)}>${friendList.link_list.length > 0 ? shuffle(friendList.link_list).map((frd) => renderTemplate`<a${addAttribute(frd.link, "href")} target="_blank" class="no-underline"><div class="group relative h-full overflow-hidden rounded-2xl border bg-background px-2.5 py-1.5 transition-colors hover:bg-muted sm:px-4 sm:py-2"><div class="relative z-10 flex h-full items-center gap-3"><div class="relative h-14 w-14 min-w-14 overflow-hidden rounded-full">${renderComponent($$result, "Image", $$ResponsiveImage, { "class": "my-0 bg-card flex items-center justify-center", "src": getAvatarSrc(frd), "height": 80, "width": 80, "alt": "Avatar", "loading": "lazy" })}<div class="absolute start-0 top-0 h-full w-full"><div class="flex h-full w-full items-center justify-center rounded-full bg-foreground opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="me-2 stroke-background"><line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"></line><polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"></polyline></svg></div></div></div><div class="flex flex-col gap-y-1"><p class="my-0 line-clamp-1 text-sm">${frd.name}</p><p class="my-0 line-clamp-1 text-xs text-muted-foreground">${frd.intro}</p></div></div>${renderComponent($$result, "Image", $$ResponsiveImage, { "class": "absolute -start-2 top-0 z-0 my-0 h-full w-2/3 bg-white object-cover opacity-15", "src": getAvatarSrc(frd), "height": 80, "width": 80, "alt": "Avatar background", "loading": "lazy", "style": {
    msMaskImage: "-ms-linear-gradient(right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
    WebkitMaskImage: "-webkit-linear-gradient(right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
    maskImage: "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
  } })}</div></a>`) : renderTemplate`<p>Nothing here.</p>`}</div>`;
}, "D:/MyBlog/src/components/links/FriendList.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const headings = [
    { depth: 2, slug: "common-links", text: "Common Links" },
    { depth: 2, slug: "special-links", text: "Special Links" },
    { depth: 2, slug: "apply-links", text: "Apply Links" }
  ];
  const { friends } = links;
  const linksConf = config.integ.links;
  const linkEditPage = "https://github.com/cworld1/astro-theme-pure/blob/main/public/links.json";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, { "title": "Links", "headings": headings, "comment": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>They're sorted randomly.</p> <h2 id="common-links">Common Links</h2> ${renderComponent($$result2, "FriendList", $$FriendList, { "list": friends[0] })} ${renderComponent($$result2, "Collapse", $$Collapse, { "title": "Links with Bad Status" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "FriendList", $$FriendList, { "list": friends[1] })} ` })} ${renderComponent($$result2, "Collapse", $$Collapse, { "title": "Link History Book" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Timeline", $$Timeline, { "events": linksConf.logbook })} ` })} <h2 id="special-links">Special Links</h2> ${renderComponent($$result2, "FriendList", $$FriendList, { "list": friends[2] })} <h2 id="apply-links">Apply Links</h2> <p>本站信息（点击复制）The site information (click to copy)：</p> <blockquote class="not-prose grid grid-cols-[auto_1fr] gap-x-2 break-words border-s-4 ps-4"> ${linksConf.applyTip.map(({ name, val }) => {
    const script = `navigator.clipboard.writeText('${val}');document.dispatchEvent(new CustomEvent('toast',{detail:{message:'Copied "${val}" to clipboard!'}}))`;
    return renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <span class="text-end">${name}:</span> <samp class="cursor-pointer"${addAttribute(script, "onclick")}> ${val} </samp> ` })}`;
  })} </blockquote> <p>
可通过下方留言或 <a${addAttribute(linkEditPage, "href")} target="_blank">提交 PR</a> 申请友链。申请说明：<br>
Apply your link by leaving comment or <a${addAttribute(linkEditPage, "href")} target="_blank">Submitting a PR</a>. Additional info:
</p> <ul> <li>推荐了本站 You've recommended our link on your website</li> <li>站点活着且有正式域名 Make sure your site is alive with a formal domain</li> <li>
至少五篇原创文章且最近一年更新过 At least 5 original articles and exists articles released in
      recent year
</li> <li>内容不违反国家法律 Content does not violate laws</li> </ul> ` })}`;
}, "D:/MyBlog/src/pages/links/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/links/index.astro";
const $$url = "/links";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
