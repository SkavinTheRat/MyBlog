import './BaseLayout_xBROlUPS.mjs';
import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_DncH_eSz.mjs';
import { $ as $$CommonPage } from './CommonPage_BtRrSOVr.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const recentListens = [
    // 示例（取消注释并替换成你自己的）：
    // { title: 'Bohemian Rhapsody', artist: 'Queen', comment: '六分钟里过完一生' },
  ];
  const favoriteAlbums = [
    // { title: 'Kind of Blue', artist: 'Miles Davis', year: '1959' },
  ];
  const playlists = [
    // { title: '我的年度歌单', link: 'https://music.163.com/', platform: '网易云音乐' },
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, { "title": "音乐" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p class="text-muted-foreground">
音乐是写代码时最好的背景。这里记录我在听什么、喜欢什么。
</p> <h2 class="mt-8 text-xl font-medium">最近在听</h2> ${recentListens.length === 0 ? renderTemplate`<div class="music-card mt-4"> <span class="eq"><i></i><i></i><i></i></span> <span class="text-muted-foreground">
歌单还在整理中。编辑 src/pages/music/index.astro 顶部的 recentListens 数组即可添加第一首。
</span> </div>` : renderTemplate`<ul class="mt-4 flex flex-col gap-y-3"> ${recentListens.map((song) => renderTemplate`<li class="music-card"> <span class="eq"><i></i><i></i><i></i></span> <span> <span class="block font-medium">${song.title}</span> <span class="block text-sm text-muted-foreground"> ${song.artist}${song.comment && ` · ${song.comment}`} </span> </span> </li>`)} </ul>`}<h2 class="mt-10 text-xl font-medium">年度最爱</h2> ${favoriteAlbums.length === 0 ? renderTemplate`<p class="mt-3 text-muted-foreground">到年底回顾时，这里会有内容。</p>` : renderTemplate`<ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"> ${favoriteAlbums.map((album) => renderTemplate`<li class="music-card"> <span> <span class="block font-medium">${album.title}</span> <span class="block text-sm text-muted-foreground"> ${album.artist}${album.year && ` · ${album.year}`} </span> </span> </li>`)} </ul>`}<h2 class="mt-10 text-xl font-medium">歌单</h2> ${playlists.length === 0 ? renderTemplate`<p class="mt-3 text-muted-foreground">公开歌单整理好后会放在这里。</p>` : renderTemplate`<ul class="mt-4 flex flex-col gap-y-3"> ${playlists.map((pl) => renderTemplate`<li> <a class="music-card"${addAttribute(pl.link, "href")} target="_blank" rel="noopener"> <span class="block font-medium">${pl.title}</span> ${pl.platform && renderTemplate`<span class="block text-sm text-muted-foreground">${pl.platform} ↗</span>`} </a> </li>`)} </ul>`}` })}`;
}, "D:/MyBlog/src/pages/music/index.astro", void 0);

const $$file = "D:/MyBlog/src/pages/music/index.astro";
const $$url = "/music";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
