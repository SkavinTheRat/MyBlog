import './BaseLayout_xBROlUPS.mjs';
import { c as createComponent } from './runtime_DzK3Yp73.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, u as unescapeHTML } from './prerender_DncH_eSz.mjs';
import { $ as $$IndividualPage } from './IndividualPage_BCDVzf1h.mjs';

const html = () => "<p>It may be recommended to generate policies from <a href=\"https://policymaker.io\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">PolicyMaker.io<span style=\"user-select:none\"> ↗</span></a>.</p>";

				const frontmatter = {"layout":"@/layouts/IndividualPage.astro","title":"Privacy Policy","description":"Effective date: 2024-11-26","language":"En","back":"/terms","minutesRead":"1 min","words":9};
				const file = "D:/MyBlog/src/pages/terms/privacy-policy.md";
				const url = "/terms/privacy-policy";
				function rawContent() {
					return "   \r\n                                        \r\n\r\n                       \r\n                                         \r\n              \r\n              \r\n   \r\n\r\nIt may be recommended to generate policies from [PolicyMaker.io](https://policymaker.io).\r\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$IndividualPage, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
