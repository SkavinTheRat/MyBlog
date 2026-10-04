import { a as config, g as getImage } from './runtime_DzK3Yp73.mjs';
import rss from '@astrojs/rss';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { s as sortMDByDate, g as getBlogCollection } from './server_D1JQhB_r.mjs';

const imagesGlob = /* #__PURE__ */ Object.assign({


});
const renderContent = async (post, site) => {
  function remarkReplaceImageLink() {
    return async (tree) => {
      const promises = [];
      visit(tree, "image", (node) => {
        if (node.url.startsWith("/images")) {
          node.url = `${site}${node.url.replace("/", "")}`;
        } else {
          const imagePathPrefix = `/src/content/blog/${post.id}/${node.url.replace("./", "")}`;
          const promise = imagesGlob[imagePathPrefix]?.().then(async (res) => {
            const imagePath = res?.default;
            if (imagePath) {
              node.url = `${site}${(await getImage({ src: imagePath })).src.replace("/", "")}`;
            }
          });
          if (promise) promises.push(promise);
        }
      });
      await Promise.all(promises);
    };
  }
  const file = await unified().use(remarkParse).use(remarkReplaceImageLink).use(remarkRehype).use(rehypeStringify).process(post.body);
  return String(file);
};
const GET = async (context) => {
  const allPostsByDate = sortMDByDate(await getBlogCollection());
  const siteUrl = context.site ?? new URL("https://skavintherat.vercel.app");
  return rss({
    // Basic configs
    trailingSlash: false,
    xmlns: { h: "http://www.w3.org/TR/html4/", atom: "http://www.w3.org/2005/Atom" },
    stylesheet: "/scripts/pretty-feed-v3.xsl",
    // Contents
    title: config.title,
    description: config.description,
    site: "https://skavintherat.vercel.app",
    items: await Promise.all(
      allPostsByDate.map(async (post) => ({
        pubDate: post.data.publishDate,
        link: `/blog/${post.id}`,
        // `pubDate` intentionally stays on `publishDate` so aggregators do not re-flow an
        // edited post as new. `atom:updated` lets readers that support it detect the edit.
        customData: `<h:img src="${typeof post.data.heroImage?.src === "string" ? post.data.heroImage?.src : post.data.heroImage?.src.src}" />
          <enclosure url="${typeof post.data.heroImage?.src === "string" ? post.data.heroImage?.src : post.data.heroImage?.src.src}" />${post.data.updatedDate ? `
          <atom:updated>${post.data.updatedDate.toISOString()}</atom:updated>` : ""}`,
        content: await renderContent(post, siteUrl),
        ...post.data
      }))
    )
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
