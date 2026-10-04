import { c as createComponent, $ as $$ResponsiveImage, a as config, r as renderEntry } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { m as maybeRenderHead, b as addAttribute, a as renderTemplate, d as defineScriptVars, r as renderComponent, c as renderSlot, s as spreadAttributes, F as Fragment } from './prerender_DncH_eSz.mjs';
import 'clsx';
import { c as cn, b as $$Icon, r as renderScript, l as getFormattedDate, m as $$FormattedDate, a as $$Button } from './BaseLayout_xBROlUPS.mjs';
import { parse } from 'node-html-parser';

const $$ArticleBottom = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ArticleBottom;
  const { id, collections, class: className } = Astro2.props;
  const path = Astro2.url.pathname.split("/").slice(0, 2).join("/");
  const index = collections.findIndex((x) => x.id === id);
  const prev = collections[index - 1];
  const next = collections[index + 1];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cn("flex max-sm:flex-col sm:justify-between gap-2", className), "class")}> <span class="min-w-0"> ${prev && renderTemplate`<a${addAttribute(`${path}/${prev.id}`, "href")} class="group inline-flex items-center gap-x-2 rounded-xl px-4 py-2 no-underline transition-colors duration-300 hover:bg-muted max-sm:max-w-[80%] sm:flex"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 rotate-180 stroke-muted-foreground transition-colors group-hover:stroke-primary"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"></polyline> </svg> <p class="truncate font-medium transition-colors">${prev.data.title}</p> </a>`} </span> <span class="min-w-0"> ${next && renderTemplate`<a${addAttribute(`${path}/${next.id}`, "href")} class="group inline-flex items-center gap-x-2 rounded-xl px-4 py-2 text-right no-underline transition-colors duration-300 hover:bg-muted max-sm:float-end max-sm:max-w-[80%] sm:flex"> <p class="truncate font-medium transition-colors">${next.data.title}</p> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 stroke-muted-foreground transition-colors group-hover:stroke-primary"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"></polyline> </svg> </a>`} </span> </div>`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/ArticleBottom.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$BackToTop = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BackToTop;
  const { header: headerName, content: contentName, needPercent = true } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<div class="z-10 md:z-50 group fixed bottom-8 end-4 transition-all flex flex-col gap-y-4 sm:end-8 astro-jxfdehre" id="action-buttons"> ', " ", " </div> <script>(function(){", "\n  class ScrollBtn extends HTMLElement {\n    actionBtns\n    scrollBtn\n    scrollPercentEl\n    targetHeader\n    articleEl\n    scrollHeight = 0\n    articleTop = 0\n    clientHeight = 0\n    ticking = false\n    needPercent = true\n\n    calculateScrollPercent() {\n      const scrollTop = Math.max(0, window.scrollY || document.documentElement.scrollTop)\n      // Before article\n      if (scrollTop < this.articleTop) return 0\n      const maxScrollable = this.scrollHeight - this.clientHeight\n      // After article\n      if (maxScrollable <= 0) return 100\n      const progress = Math.min(scrollTop - this.articleTop, maxScrollable)\n      return Math.round((progress / maxScrollable) * 100)\n    }\n\n    updateScrollPercent() {\n      const percent = this.calculateScrollPercent()\n      this.scrollPercentEl.textContent = percent.toString()\n      this.actionBtns.classList.toggle('ended', percent >= 100)\n      this.ticking = false\n    }\n\n    connectedCallback() {\n      this.needPercent = needPercent\n      this.actionBtns = document.getElementById('action-buttons')\n      this.scrollBtn = this.querySelector('button#to-top-btn')\n      this.scrollPercentEl = this.scrollBtn.querySelector('.top-text .text')\n      this.targetHeader = document.getElementById(headerName)\n      this.articleEl = document.getElementById(contentName)\n\n      if (!this.articleEl) {\n        console.error(`Element with ID ${contentName} not found.`)\n        needPercent = false\n      }\n      // Scroll to top action\n      this.scrollBtn.addEventListener('click', this)\n      // Observe header visibility\n      if (this.targetHeader) {\n        const observer = new IntersectionObserver((entries) => {\n          entries.forEach((entry) => {\n            this.actionBtns.classList.toggle('show', !entry.isIntersecting)\n          })\n        })\n        observer.observe(this.targetHeader)\n      } else {\n        console.error(`Element with ID ${headerName} not found.`)\n      }\n      // Scroll percent update\n      if (this.needPercent) {\n        this.scrollHeight = this.articleEl.scrollHeight\n        this.articleTop = this.articleEl.offsetTop\n        this.clientHeight = document.documentElement.clientHeight\n\n        document.addEventListener('scroll', () => {\n          if (!this.ticking) {\n            requestAnimationFrame(() => this.updateScrollPercent())\n            this.ticking = true\n          }\n        })\n      } else {\n        this.actionBtns.classList.add('ended')\n      }\n    }\n\n    handleEvent(event) {\n      if (event.type === 'click') {\n        window.scrollTo({ top: 0, behavior: 'smooth' })\n      }\n    }\n  }\n  customElements.define('scroll-button', ScrollBtn)\n})();<\/script>"], ["", '<div class="z-10 md:z-50 group fixed bottom-8 end-4 transition-all flex flex-col gap-y-4 sm:end-8 astro-jxfdehre" id="action-buttons"> ', " ", " </div> <script>(function(){", "\n  class ScrollBtn extends HTMLElement {\n    actionBtns\n    scrollBtn\n    scrollPercentEl\n    targetHeader\n    articleEl\n    scrollHeight = 0\n    articleTop = 0\n    clientHeight = 0\n    ticking = false\n    needPercent = true\n\n    calculateScrollPercent() {\n      const scrollTop = Math.max(0, window.scrollY || document.documentElement.scrollTop)\n      // Before article\n      if (scrollTop < this.articleTop) return 0\n      const maxScrollable = this.scrollHeight - this.clientHeight\n      // After article\n      if (maxScrollable <= 0) return 100\n      const progress = Math.min(scrollTop - this.articleTop, maxScrollable)\n      return Math.round((progress / maxScrollable) * 100)\n    }\n\n    updateScrollPercent() {\n      const percent = this.calculateScrollPercent()\n      this.scrollPercentEl.textContent = percent.toString()\n      this.actionBtns.classList.toggle('ended', percent >= 100)\n      this.ticking = false\n    }\n\n    connectedCallback() {\n      this.needPercent = needPercent\n      this.actionBtns = document.getElementById('action-buttons')\n      this.scrollBtn = this.querySelector('button#to-top-btn')\n      this.scrollPercentEl = this.scrollBtn.querySelector('.top-text .text')\n      this.targetHeader = document.getElementById(headerName)\n      this.articleEl = document.getElementById(contentName)\n\n      if (!this.articleEl) {\n        console.error(\\`Element with ID \\${contentName} not found.\\`)\n        needPercent = false\n      }\n      // Scroll to top action\n      this.scrollBtn.addEventListener('click', this)\n      // Observe header visibility\n      if (this.targetHeader) {\n        const observer = new IntersectionObserver((entries) => {\n          entries.forEach((entry) => {\n            this.actionBtns.classList.toggle('show', !entry.isIntersecting)\n          })\n        })\n        observer.observe(this.targetHeader)\n      } else {\n        console.error(\\`Element with ID \\${headerName} not found.\\`)\n      }\n      // Scroll percent update\n      if (this.needPercent) {\n        this.scrollHeight = this.articleEl.scrollHeight\n        this.articleTop = this.articleEl.offsetTop\n        this.clientHeight = document.documentElement.clientHeight\n\n        document.addEventListener('scroll', () => {\n          if (!this.ticking) {\n            requestAnimationFrame(() => this.updateScrollPercent())\n            this.ticking = true\n          }\n        })\n      } else {\n        this.actionBtns.classList.add('ended')\n      }\n    }\n\n    handleEvent(event) {\n      if (event.type === 'click') {\n        window.scrollTo({ top: 0, behavior: 'smooth' })\n      }\n    }\n  }\n  customElements.define('scroll-button', ScrollBtn)\n})();<\/script>"])), maybeRenderHead(), renderSlot($$result, $$slots["other-icons"]), renderComponent($$result, "scroll-button", "scroll-button", { "class": "astro-jxfdehre" }, { "default": () => renderTemplate` <button aria-label="Back to Top" class="relative size-10 flex items-center justify-center rounded-full border-2 border-transparent bg-muted text-muted-foreground duration-300 hover:border-border/75 sm:size-12 opacity-0 astro-jxfdehre" id="to-top-btn"> <div class="top-text absolute bottom-0 end-0 start-0 top-0 flex items-center justify-center group-[.ended]:opacity-0 astro-jxfdehre"> <span class="text astro-jxfdehre">10</span> <span class="text-xs astro-jxfdehre">%</span> </div> ${renderComponent($$result, "Icon", $$Icon, { "name": "up", "class": "top-icon group-[.ended]:opacity-100 astro-jxfdehre" })} </button> ` }), defineScriptVars({ headerName, contentName, needPercent }));
}, "D:/MyBlog/node_modules/astro-pure/components/pages/BackToTop.astro", void 0);

const $$Quote = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Quote;
  const { class: className } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "quote-component", "quote-component", { "class": cn("not-prose inline-block", className) }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="flex flex-row items-center gap-x-3 rounded-full border px-4 py-2 text-sm shadow-sm"> <span class="relative flex items-center justify-center"> <span class="absolute size-2 animate-ping rounded-full border border-green-400 bg-green-400 opacity-75"></span> <span class="size-2 rounded-full bg-green-400"></span> </span> <p id="quote-sentence" class="font-medium text-muted-foreground">Loading...</p> </div> ` })} ${renderScript($$result, "D:/MyBlog/node_modules/astro-pure/components/advanced/Quote.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/node_modules/astro-pure/components/advanced/Quote.astro", void 0);

const $$GithubCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$GithubCard;
  const { repo: repoRaw } = Astro2.props;
  const repo = repoRaw.replace(/^https:\/\/github\.com\//, "");
  const [owner, repoName] = repo.split("/");
  return renderTemplate`${renderComponent($$result, "github-card", "github-card", { "class": "not-prose loading astro-fkh43kdv", "data-repo": repo }, { "default": () => renderTemplate` ${maybeRenderHead()}<a${addAttribute(`https://github.com/${repo}`, "href")} target="_blank" class="group block flex flex-col gap-y-2 rounded-xl border px-4 py-3 transition-colors hover:bg-muted hover:text-muted-foreground sm:px-5 sm:py-4 astro-fkh43kdv"> <div class="flex items-center justify-between gap-x-2 astro-fkh43kdv"> <div class="flex min-w-0 flex-1 items-center gap-x-2 text-foreground group-hover:text-primary astro-fkh43kdv"> <div id="gh-avatar" class="load-block me-2 size-7 flex-shrink-0 bg-cover sm:size-8 astro-fkh43kdv" style="border-radius:999px"></div> <div class="min-w-0 flex-1 astro-fkh43kdv"> <div class="flex items-center gap-x-1 max-sm:flex-wrap astro-fkh43kdv"> <span class="truncate text-base transition-colors sm:text-lg astro-fkh43kdv">${owner}</span> <span class="text-muted-foreground max-sm:hidden astro-fkh43kdv">/</span> <span class="truncate text-base font-medium transition-colors sm:text-lg max-sm:w-full astro-fkh43kdv">${repoName}</span> </div> </div> </div> <div class="flex-shrink-0 rounded-full bg-card p-1 astro-fkh43kdv"> ${renderComponent($$result, "Icon", $$Icon, { "name": "github", "class": "astro-fkh43kdv" })} </div> </div> <p id="gh-description" class="load-block text-sm sm:text-base astro-fkh43kdv">Waiting for api.github.com...</p> <div class="flex items-center justify-between gap-x-2 astro-fkh43kdv"> <div class="load-block flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-5 astro-fkh43kdv"> <div class="flex items-center gap-x-1.5 sm:gap-x-2 astro-fkh43kdv">  <!-- prettier-ignore --> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="sm:w-[22px] sm:h-[22px] astro-fkh43kdv"><g fill="none" fill-rule="evenodd" class="astro-fkh43kdv"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" class="astro-fkh43kdv"></path><path fill="currentColor" d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798l5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141l.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525l-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176zM12 4.987L9.687 8.959a1.25 1.25 0 0 1-.816.592l-4.492.973l3.062 3.427c.234.262.347.61.312.959l-.463 4.573l4.206-1.854a1.25 1.25 0 0 1 1.008 0l4.206 1.854l-.463-4.573a1.25 1.25 0 0 1 .311-.959l3.063-3.427l-4.492-.973a1.25 1.25 0 0 1-.816-.592z" class="astro-fkh43kdv"></path></g></svg> <span id="gh-stars" class="text-sm leading-tight sm:text-base astro-fkh43kdv">???</span> </div> <div class="flex items-center gap-x-1.5 sm:gap-x-2 astro-fkh43kdv">  <!-- prettier-ignore --> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="sm:w-[22px] sm:h-[22px] astro-fkh43kdv"><g fill="none" class="astro-fkh43kdv"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" class="astro-fkh43kdv"></path><path fill="currentColor" d="M18 3a3 3 0 0 1 1 5.83V9a4 4 0 0 1-4 4H9a2 2 0 0 0-2 2v.17a3.001 3.001 0 1 1-2 0V8.83a3.001 3.001 0 1 1 2 0v2.705A4 4 0 0 1 9 11h6a2 2 0 0 0 2-2v-.17A3.001 3.001 0 0 1 18 3M6 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" class="astro-fkh43kdv"></path></g></svg> <span id="gh-forks" class="text-sm leading-tight sm:text-base astro-fkh43kdv">???</span> </div> <div class="flex items-center gap-x-1.5 sm:gap-x-2 astro-fkh43kdv">  <!-- prettier-ignore --> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="sm:w-[22px] sm:h-[22px] astro-fkh43kdv"><g fill="none" fill-rule="evenodd" class="astro-fkh43kdv"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" class="astro-fkh43kdv"></path><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v1h.764a2 2 0 0 1 .894.211L16.236 6H20a1 1 0 1 1 0 2h-.382l2.276 4.553c.07.139.106.292.106.447a4 4 0 0 1-8 0c0-.155.036-.308.106-.447L16.382 8h-.146a2 2 0 0 1-.894-.211L13.764 7H13v12h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3V7h-.764l-1.578.789A2 2 0 0 1 7.764 8h-.146l2.276 4.553A1 1 0 0 1 10 13a4 4 0 0 1-8 0a1 1 0 0 1 .106-.447L4.382 8H4a1 1 0 0 1 0-2h3.764l1.578-.789A2 2 0 0 1 10.236 5H11V4a1 1 0 0 1 1-1M6 9.236l-1.989 3.977a2 2 0 0 0 3.978 0zm12 0l-1.989 3.977a2 2 0 0 0 3.955.157l.023-.156z" class="astro-fkh43kdv"></path></g></svg> <span id="gh-license" class="text-sm leading-tight sm:text-base astro-fkh43kdv">???</span> </div> </div> <span id="gh-language" class="load-block text-sm leading-tight sm:text-base astro-fkh43kdv">?????</span> </div> </a> ` })}  ${renderScript($$result, "D:/MyBlog/node_modules/astro-pure/components/advanced/GithubCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/node_modules/astro-pure/components/advanced/GithubCard.astro", void 0);

class LRU extends Map {
  constructor(maxSize) {
    super();
    this.maxSize = maxSize;
  }
  get(key) {
    const value = super.get(key);
    if (value) this.#touch(key, value);
    return value;
  }
  set(key, value) {
    this.#touch(key, value);
    if (this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey !== void 0) this.delete(firstKey);
    }
    return this;
  }
  #touch(key, value) {
    this.delete(key);
    super.set(key, value);
  }
}
const formatError = (...lines) => lines.join("\n         ");
makeSafeGetter((res) => res.json());
const safeGetDOM = makeSafeGetter(async (res) => parse.parse(await res.text()));
function makeSafeGetter(handleResponse, { cacheSize = 1e3 } = {}) {
  const cache = new LRU(cacheSize);
  return async function safeGet2(url) {
    try {
      const cached = cache.get(url);
      if (cached) return cached;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(
          formatError(`Failed to fetch ${url}`, `Error ${response.status}: ${response.statusText}`)
        );
      const result = await handleResponse(response);
      cache.set(url, result);
      return result;
    } catch (e) {
      console.error(formatError(`[error] astro-embed`, e?.message ?? e, `URL: ${url}`));
      return void 0;
    }
  };
}
const getContent = (el) => el?.getAttribute("content");
const urlOrNull = (url) => url?.slice(0, 8) === "https://" ? url : null;
async function parseOpenGraph(pageUrl) {
  const html = await safeGetDOM(pageUrl);
  if (!html) return;
  const getMetaProperty = (prop) => getContent(html.querySelector(`meta[property=${JSON.stringify(prop)}]`));
  const getMetaName = (name) => getContent(html.querySelector(`meta[name=${JSON.stringify(name)}]`));
  const title = getMetaProperty("og:title") || html.querySelector("title")?.textContent;
  const description = getMetaProperty("og:description") || getMetaName("description");
  const image = urlOrNull(
    getMetaProperty("og:image:secure_url") || getMetaProperty("og:image:url") || getMetaProperty("og:image")
  );
  const imageAlt = getMetaProperty("og:image:alt");
  const video = urlOrNull(
    getMetaProperty("og:video:secure_url") || getMetaProperty("og:video:url") || getMetaProperty("og:video")
  );
  const videoType = getMetaProperty("og:video:type");
  const url = urlOrNull(
    getMetaProperty("og:url") || html.querySelector("link[rel='canonical']")?.getAttribute("href")
  ) || pageUrl;
  return { title, description, image, imageAlt, url, video, videoType };
}

const $$LinkPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LinkPreview;
  const { href, hideMedia = false, zoomable = true } = Astro2.props;
  const meta = await parseOpenGraph(href);
  const domain = meta?.url ? new URL(meta.url).hostname.replace("www.", "") : "";
  return renderTemplate`${meta && meta.title ? renderTemplate`${maybeRenderHead()}<div class="not-prose link-preview-container my-2 flex justify-center sm:my-4 astro-fov3225h"><article${addAttribute([[
    "link-preview flex flex-col overflow-hidden rounded-lg border max-sm:max-w-sm sm:flex-row",
    {
      "link-preview--has-video max-sm:max-w-none sm:flex-col": !hideMedia && meta.video && meta.videoType,
      "link-preview--no-media": hideMedia || !(meta.video && meta.videoType || meta.image)
    }
  ], "astro-fov3225h"], "class:list")}>${hideMedia ? null : meta.video && meta.videoType ? renderTemplate`<video controls preload="metadata" width="1200" height="630" class="astro-fov3225h"><source${addAttribute(meta.video, "src")}${addAttribute(meta.videoType, "type")} class="astro-fov3225h"></video>` : meta.image ? renderTemplate`${renderComponent($$result, "Image", $$ResponsiveImage, { "class": (cn("m-0 sm:max-w-60", zoomable && "zoomable") ?? "") + " astro-fov3225h", "src": meta.image, "alt": meta.imageAlt || "", "width": "1200", "height": "630" })}` : null}<a class="group font-normal text-muted-foreground no-underline hover:text-muted-foreground astro-fov3225h"${addAttribute(href, "href")} target="_blank"><div class="link-preview__content flex h-full flex-col gap-y-1 px-3 py-2 transition-colors group-hover:bg-muted sm:px-5 sm:py-4 astro-fov3225h"><header class="line-clamp-1 font-medium text-foreground transition-colors group-hover:text-primary astro-fov3225h">${meta.title}</header><p class="link-preview__description line-clamp-2 astro-fov3225h">${meta.description}${" "}${domain && renderTemplate`<small class="link-preview__domain ml-1 astro-fov3225h">(${domain})</small>`}</p></div></a></article></div>` : renderTemplate`<div class="link-preview link-preview--no-metadata astro-fov3225h"><a${addAttribute(href, "href")} target="_blank" class="astro-fov3225h">${href}</a></div>`}`;
}, "D:/MyBlog/node_modules/astro-pure/components/advanced/LinkPreview.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$QRCode = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$QRCode;
  const { content, class: className, ...props } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div id="qrcode-container"', "", "></div> <script", "><\/script> <script>(function(){", "\n  const renderContent = content ?? window.location.href\n  // Load qrcode\n  function loadQRcode(qrcodeContainer) {\n    if (!qrcodeContainer) throw new Error('qrcode container not found')\n    if (qrcodeContainer.innerHTML !== '') return\n    new QRCode(qrcodeContainer, renderContent)\n  }\n  const qrcodeContainer = document.getElementById('qrcode-container')\n  if (!qrcodeContainer) throw new Error('qrcode container not found')\n  loadQRcode(qrcodeContainer)\n})();<\/script>"])), maybeRenderHead(), addAttribute((className ?? "") + " astro-nafosdfo", "class"), spreadAttributes(props), addAttribute(`${config.npmCDN}/qrcodejs/qrcode.min.js`, "src"), defineScriptVars({ content }));
}, "D:/MyBlog/node_modules/astro-pure/components/advanced/QRCode.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$MediumZoom = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MediumZoom;
  const { selector = config.integ.mediumZoom.selector, background = "hsl(var(--background) / 0.8)" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<script", "><\/script> <script>(function(){", "\n  mediumZoom(selector, { background })\n})();<\/script> "])), addAttribute(`${config.npmCDN}/medium-zoom/dist/pure/medium-zoom.min.umd.js`, "src"), defineScriptVars({ selector, background }));
}, "D:/MyBlog/node_modules/astro-pure/components/advanced/MediumZoom.astro", void 0);

const $$Copyright = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Copyright;
  const { data, class: className } = Astro2.props;
  const { title, publishDate } = data;
  const heroImage = "heroImage" in data ? data.heroImage : void 0;
  const image = typeof heroImage?.src === "string" ? heroImage?.src : heroImage?.src?.src ?? "";
  const shares = {
    weibo: {
      link: `http://service.weibo.com/share/share.php?url=${Astro2.url}&title=${title}&pic=${image}`
    },
    x: {
      link: `https://x.com/intent/tweet?text='${title}'&url='${Astro2.url}'&via='${config.author}'`
    },
    bluesky: {
      link: `https://bsky.app/intent/compose?text=${title}%0A${Astro2.url}`
    }
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute((cn(
    "relative flex flex-col gap-y-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-3",
    className
  ) ?? "") + " astro-sjxyoaq4", "class")}> ${renderComponent($$result, "Icon", $$Icon, { "class": "absolute end-4 top-4 size-20 opacity-10 astro-sjxyoaq4", "name": "copyright" })}  <div class="flex flex-col astro-sjxyoaq4"> <div class="font-medium text-foreground astro-sjxyoaq4">${title}</div> <div class="text-sm line-clamp-1 astro-sjxyoaq4">${Astro2.url}</div> </div>  <div class="flex flex-row flex-wrap justify-start gap-x-5 gap-y-1 sm:gap-x-8 astro-sjxyoaq4"> <div class="flex gap-x-2 sm:flex-col astro-sjxyoaq4"> <span class="astro-sjxyoaq4">Author</span> <span class="text-sm text-foreground max-sm:place-self-center astro-sjxyoaq4">${config.author}</span> </div> ${publishDate && renderTemplate`<div class="flex gap-x-2 sm:min-w-16 sm:flex-col astro-sjxyoaq4"> <span class="astro-sjxyoaq4">Published at</span> <span class="text-sm text-foreground max-sm:place-self-center astro-sjxyoaq4"> ${getFormattedDate(publishDate, {
    month: "long"
  })} </span> </div>`} <div class="flex gap-x-2 sm:flex-col astro-sjxyoaq4"> <span class="astro-sjxyoaq4">Copyright</span> <a class="text-sm text-foreground max-sm:place-self-center astro-sjxyoaq4" href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
CC BY-NC-SA 4.0
</a> </div> </div>  <div class="relative astro-sjxyoaq4"> <div class="flex flex-row gap-3 astro-sjxyoaq4"> <button id="copy-link" aria-label="Copy link" class="group rounded-full bg-muted p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5 astro-sjxyoaq4"> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-5 astro-sjxyoaq4", "name": "link" })} </button> <button id="get-qrcode" aria-label="Get QR code" class="group rounded-full bg-muted p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5 astro-sjxyoaq4"> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-5 astro-sjxyoaq4", "name": "qrcode" })} </button> ${config.content.share.map((share) => renderTemplate`<a${addAttribute(shares[share].link, "href")} target="_blank"${addAttribute(`share-${share}`, "id")}${addAttribute(`Share to ${share}`, "aria-label")} class="group rounded-full bg-muted p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5 astro-sjxyoaq4"> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-5 astro-sjxyoaq4", "name": share })} </a>`)} </div> ${renderComponent($$result, "QRCode", $$QRCode, { "class": "absolute z-10 -mt-2 box-content max-h-0 max-w-44 overflow-hidden rounded-xl border bg-muted p-4 opacity-0 transition-all duration-300 ease-in-out astro-sjxyoaq4" })} </div> </div> <div class="mx-6 rounded-b-xl border border-t-0 px-3 pb-1.5 pt-1 sm:mx-8 sm:px-4 astro-sjxyoaq4"> <a href="/projects#sponsorship" class="flex items-center justify-between text-muted-foreground no-underline astro-sjxyoaq4" target="_blank"> <span class="astro-sjxyoaq4">Buy me a cup of coffee ☕.</span> ${renderComponent($$result, "Icon", $$Icon, { "class": "box-content size-5 p-1 astro-sjxyoaq4", "name": "receive-money" })} </a> </div>  ${renderScript($$result, "D:/MyBlog/node_modules/astro-pure/components/pages/Copyright.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/Copyright.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const {
    data: { title, description, draft, heroImage, publishDate, updatedDate, tags, language },
    remarkPluginFrontmatter
  } = Astro2.props;
  const dateTimeOptions = {
    month: "short"
  };
  return renderTemplate`${heroImage && renderTemplate`${maybeRenderHead()}<div class="hero-image relative mb-6 astro-qr7qsrsa">${renderComponent($$result, "Image", $$ResponsiveImage, { "alt": heroImage.alt || title, "class": "cover-image relative z-10 h-auto w-full max-w-[65ch] rounded-2xl object-contain astro-qr7qsrsa", "fetchpriority": "high", "loading": "eager", ...heroImage })}${renderComponent($$result, "Image", $$ResponsiveImage, { "alt": "Blur image", "fetchpriority": "high", "loading": "eager", "id": "blurImage", "class": "absolute end-0 top-4 z-0 mt-0 h-full max-w-[65ch] rounded-3xl opacity-60 transition-opacity duration-300 astro-qr7qsrsa", ...heroImage })}</div>`}${draft ? renderTemplate`<span class="text-red-500 astro-qr7qsrsa">(Draft)</span>` : null}<div class="article-info max-lg:mx-auto astro-qr7qsrsa"> <div class="flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-muted-foreground astro-qr7qsrsa">  <div class="flex items-center gap-1 astro-qr7qsrsa"> ${renderComponent($$result, "Icon", $$Icon, { "name": "calendar", "class": "size-5 astro-qr7qsrsa" })} ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "class": "font-sans astro-qr7qsrsa", "date": publishDate, "dateTimeOptions": dateTimeOptions })} ${updatedDate && renderTemplate`<div class="flex items-center gap-1 astro-qr7qsrsa"> <span class="astro-qr7qsrsa"> / </span> <span class="astro-qr7qsrsa">
Update
${renderComponent($$result, "FormattedDate", $$FormattedDate, { "class": "font-sans astro-qr7qsrsa", "date": updatedDate, "dateTimeOptions": dateTimeOptions })} </span> </div>`} </div>  <div class="flex items-center gap-1 astro-qr7qsrsa"> ${renderComponent($$result, "Icon", $$Icon, { "name": "time", "class": "size-5 astro-qr7qsrsa" })} ${remarkPluginFrontmatter.minutesRead} </div> ${// Language
  language && renderTemplate`<span class="flex items-center gap-1 astro-qr7qsrsa"> ${renderComponent($$result, "Icon", $$Icon, { "name": "earth", "class": "size-5 astro-qr7qsrsa" })} ${language} </span>`} ${// Tags
  !!tags?.length && renderTemplate`<span class="flex items-center gap-1 astro-qr7qsrsa"> ${renderComponent($$result, "Icon", $$Icon, { "name": "hashtag", "class": "size-5 astro-qr7qsrsa" })} ${tags.map((tag, i) => renderTemplate`<div class="astro-qr7qsrsa"> <a${addAttribute(`View more blogs with the tag ${tag}`, "aria-label")} class="hover:underline hover:underline-offset-4 astro-qr7qsrsa" data-pagefind-filter="tag"${addAttribute(`/tags/${tag}`, "href")}> ${tag} </a> ${i < tags.length - 1 && "/"} </div>`)} </span>`} </div> <h1 class="mt-4 text-2xl font-medium sm:mb-2 sm:mt-6 sm:text-3xl astro-qr7qsrsa"> ${title} </h1> <div class="mt-3 italic astro-qr7qsrsa"> <blockquote class="text-sm text-muted-foreground astro-qr7qsrsa"><q class="astro-qr7qsrsa">${description}</q></blockquote> ${renderSlot($$result, $$slots["description"])} </div> </div>  <div class="mt-4 w-1/2 border-t max-md:mx-auto sm:mt-6 sm:w-1/3 astro-qr7qsrsa"></div> ${renderScript($$result, "D:/MyBlog/node_modules/astro-pure/components/pages/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/Hero.astro", void 0);

const $$Paginator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Paginator;
  const { nextUrl, prevUrl } = Astro2.props;
  return renderTemplate`${(prevUrl || nextUrl) && renderTemplate`${maybeRenderHead()}<nav class="mt-4 flex items-center gap-x-4 sm:mt-6">${prevUrl && renderTemplate`<a class="me-auto py-2" data-astro-prefetch${addAttribute(prevUrl.url, "href")}>${prevUrl.srLabel && renderTemplate`<span class="sr-only">${prevUrl.srLabel}</span>`}${prevUrl.text ? prevUrl.text : "Previous"}</a>`}${nextUrl && renderTemplate`<a class="ms-auto py-2" data-astro-prefetch${addAttribute(nextUrl.url, "href")}>${nextUrl.srLabel && renderTemplate`<span class="sr-only">${nextUrl.srLabel}</span>`}${nextUrl.text ? nextUrl.text : "Next"}</a>`}</nav>`}`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/Paginator.astro", void 0);

const $$PostPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PostPreview;
  const { post, detailed = false, class: className } = Astro2.props;
  const { id, data } = post;
  const { remarkPluginFrontmatter } = await renderEntry(post);
  const postDate = data.updatedDate ?? data.publishDate;
  const previewData = data;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute((cn("post-preview", className) ?? "") + " astro-yh2ne4rs", "class")}${addAttribute(detailed && previewData.heroImage?.color && `--preview-highlight:color-mix(in srgb,${previewData.heroImage.color} 40%,hsl(var(--foreground)/var(--un-text-opacity,1)));
    --preview-highlight-bg:hsl(from ${previewData.heroImage.color} h s l/20%)`, "style")}> <a${addAttribute((cn(
    "block w-full relative group rounded-2xl border bg-background transition-colors ease-in-out px-5 py-2.5 hover:bg-muted hover:text-primary",
    detailed && "max-sm:px-4 sm:py-5",
    detailed && previewData.heroImage && "max-md:pt-24"
  ) ?? "") + " astro-yh2ne4rs", "class")}${addAttribute(`/blog/${id}`, "href")} data-astro-prefetch> ${detailed && previewData.heroImage && renderTemplate`${renderComponent($$result, "Image", $$ResponsiveImage, { "alt": previewData.heroImage.alt || data.title, "class": "cover-image absolute end-0 top-0 z-0 h-2/3 w-full rounded-2xl object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-70 md:h-full md:w-3/5 astro-yh2ne4rs", "loading": "eager", ...previewData.heroImage })}`} <div${addAttribute((cn("relative flex flex-col gap-1", !detailed && "sm:flex-row sm:items-center") ?? "") + " astro-yh2ne4rs", "class")} style="z-index:1"> ${postDate && renderTemplate`${renderComponent($$result, "FormattedDate", $$FormattedDate, { "class": "min-w-[95px] text-xs astro-yh2ne4rs", "date": postDate })}`}  <div class="flex justify-between flex-grow astro-yh2ne4rs"> <div${addAttribute((cn(detailed && "font-medium") ?? "") + " astro-yh2ne4rs", "class")}> ${previewData.pin && renderTemplate`<span class="text-primary me-1 astro-yh2ne4rs">[Pin]</span>`} ${data.draft && renderTemplate`<span class="text-red-500 me-1 astro-yh2ne4rs">(Draft)</span>`} ${data.title} </div> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="preview-redirect my-1 stroke-muted-foreground group-hover:stroke-primary astro-yh2ne4rs"><line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100 astro-yh2ne4rs"></line><polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 astro-yh2ne4rs"></polyline></svg> </div> ${detailed && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-yh2ne4rs" }, { "default": async ($$result2) => renderTemplate`<p${addAttribute((cn(
    "line-clamp-2 text-sm text-muted-foreground sm:line-clamp-3",
    previewData.heroImage && "sm:me-24"
  ) ?? "") + " astro-yh2ne4rs", "class")}> ${data.description} </p> <div class="py-2 flex items-center gap-2 text-sm italic leading-4 text-muted-foreground astro-yh2ne4rs">  <span class="flex items-center gap-1 astro-yh2ne4rs"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "time", "class": "size-4 astro-yh2ne4rs" })} ${remarkPluginFrontmatter.minutesRead} </span>  ${previewData.language && renderTemplate`<span class="flex items-center gap-1 astro-yh2ne4rs"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "earth", "class": "size-4 astro-yh2ne4rs" })} ${previewData.language} </span>`} </div> ${data.tags.length > 0 && renderTemplate`<object title="Tags" aria-label="Tags" aria-labelledby="Tags" class="astro-yh2ne4rs"> <ul class="tag-list mt-1 flex gap-2 astro-yh2ne4rs"> ${data.tags.map((tag) => renderTemplate`<li class="astro-yh2ne4rs"> ${renderComponent($$result2, "Button", $$Button, { "as": "a", "title": tag, "href": `/tags/${tag}`, "variant": "pill", "class": "astro-yh2ne4rs" })} </li>`)} </ul> </object>`}` })}`} </div> </a> </li>`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/PostPreview.astro", void 0);

function generateToc(headings) {
  const root = { depth: 0, slug: "root", text: "Root", subheadings: [] };
  const stack = [root];
  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] };
    while (stack[stack.length - 1].depth >= heading.depth) {
      stack.pop();
    }
    stack[stack.length - 1].subheadings.push(heading);
    stack.push(heading);
  });
  return root.subheadings;
}

const $$TOCHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TOCHeading;
  const {
    heading: { depth, slug, subheadings, text: rawText }
  } = Astro2.props;
  const text = rawText.endsWith("#") ? rawText.slice(0, -1) : rawText;
  return renderTemplate`${maybeRenderHead()}<li> <div class="relative"> <span class="absolute top-[5%] w-[2px] rounded transition-colors duration-300 [&.highlight-bg]:bg-primary [&.is-read]:bg-border"></span> <a${addAttribute(`Scroll to section: ${text}`, "aria-label")}${addAttribute(cn(
    "toc-item line-clamp-2 px-3 py-1 ms-2 text-foreground/75 transition-all hover:text-foreground [&.highlight]:font-medium [&.highlight]:text-primary [&.highlight-bg-translucent]:bg-muted",
    depth > 2 && "ps-7"
  ), "class")}${addAttribute(`#${slug}`, "href")}>${text}</a> </div> ${!!subheadings.length && renderTemplate`<ul> ${subheadings.map((subheading) => renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, { "heading": subheading })}`)} </ul>`} </li>`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/TOCHeading.astro", void 0);

const $$TOC = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TOC;
  const { headings, class: className, ...props } = Astro2.props;
  const toc = generateToc(headings);
  return renderTemplate`${renderComponent($$result, "toc-heading", "toc-heading", { "class": (className ?? "") + " astro-mmcgqrmu", ...props }, { "default": () => renderTemplate` ${maybeRenderHead()}<h2 class="font-medium astro-mmcgqrmu">TABLE OF CONTENTS</h2> <ul class="mt-4 astro-mmcgqrmu"> ${toc.map((heading) => renderTemplate`${renderComponent($$result, "TOCHeading", $$TOCHeading, { "heading": heading, "class": "astro-mmcgqrmu" })}`)} </ul> ` })} ${renderScript($$result, "D:/MyBlog/node_modules/astro-pure/components/pages/TOC.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/TOC.astro", void 0);

const $$PFSearch = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "site-search", "site-search", { "class": "astro-574sfdxb" }, { "default": () => renderTemplate` ${maybeRenderHead()}<aside class="form my-4 astro-574sfdxb"> ${renderTemplate`<div id="site-search" class="astro-574sfdxb"></div>`} </aside> ` })} ${renderScript($$result, "D:/MyBlog/node_modules/astro-pure/components/pages/PFSearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MyBlog/node_modules/astro-pure/components/pages/PFSearch.astro", void 0);

export { $$PostPreview as $, $$MediumZoom as a, $$TOC as b, $$Hero as c, $$Copyright as d, $$ArticleBottom as e, $$Paginator as f, $$BackToTop as g, $$PFSearch as h, $$Quote as i };
