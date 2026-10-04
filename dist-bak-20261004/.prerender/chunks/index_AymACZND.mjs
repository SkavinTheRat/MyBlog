import { c as cn, b as $$Icon } from './BaseLayout_xBROlUPS.mjs';
import { c as createComponent, $ as $$ResponsiveImage } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { m as maybeRenderHead, b as addAttribute, s as spreadAttributes, r as renderComponent, a as renderTemplate } from './prerender_DncH_eSz.mjs';
import { $ as $$CommonPage } from './CommonPage_BtRrSOVr.mjs';

const $$ProjectSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectSection;
  const { class: className, projects, ...props } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({

});
  const projectIconSet = {
    github: "github-circle",
    site: "earth",
    doc: "document",
    release: "package"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(className, "class")}${spreadAttributes(props)}> <div class="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-4"> ${projects.map((project) => {
    var imagePath = null;
    if (project.image) {
      imagePath = "/src/assets/projects/" + project.image;
      if (!images[imagePath])
        throw new Error(
          `"${imagePath}" does not exist in glob: "src/assets/projects/*.{jpeg,jpg,png,gif,avif,webp}"`
        );
    }
    return renderTemplate`<div class="relative overflow-hidden rounded-xl border"> ${imagePath && renderTemplate`${renderComponent($$result, "Image", $$ResponsiveImage, { "class": "absolute end-0 z-0 m-0 h-full w-1/2 object-cover opacity-40", "src": images[imagePath](), "alt": project.name, "loading": "lazy", "style": {
      msMaskImage: "-ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
      WebkitMaskImage: "-webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
      maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
    } })}`} <div${addAttribute(cn(
      "relative z-10 flex flex-col gap-y-1 px-2 py-1.5 sm:px-3 sm:py-2",
      imagePath && "me-20"
    ), "class")}> <a class="line-clamp-1 font-medium text-foreground no-underline transition-colors"${addAttribute(project.links[0].href, "href")} target="_blank"> ${project.name} </a> <div class="line-clamp-2 leading-snug text-muted-foreground sm:h-12"> ${project.description} </div> <div class="flex flex-row items-center gap-x-2 sm:gap-x-3"> ${project.links.map((link) => {
      const icon = projectIconSet[link.type];
      return renderTemplate`<a${addAttribute(link.href, "href")} class="rounded-full bg-muted p-1 text-muted-foreground transition-colors sm:p-1.5"${addAttribute(link.type, "aria-label")} target="_blank"> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-5", "name": icon })} </a>`;
    })} </div> </div> </div>`;
  })} </div> </div>`;
}, "D:/MyBlog/src/components/projects/ProjectSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const headings = [
    { depth: 2, slug: "programs", text: "Programs" },
    { depth: 2, slug: "learnings", text: "Learnings" }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, { "title": "Projects", "headings": headings }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p class="text-muted-foreground">
这里会逐步放上我做过的项目。大一刚刚开始——第一个项目，很可能就是本站的持续迭代。
</p> <h2 id="programs">Programs</h2> ${renderComponent($$result2, "ProjectSection", $$ProjectSection, { "projects": [
    {
      name: "🐀 SkavinTheRat Blog",
      description: "你正在浏览的这个网站：Astro + Astro Theme Pure 定制，米色海报风",
      links: [{ type: "site", href: "/" }]
    }
  ] })} <h2 id="learnings">Learnings</h2> <p class="text-muted-foreground">
课程笔记与练习代码的仓库会列在这里（如 Python 学习、CS 课程作业）。等它们足够体面时再来。
</p> ` })}`;
}, "D:/MyBlog/src/pages/projects/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
