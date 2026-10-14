import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

/**
 * 键名归一化
 * Obsidian 的属性编辑器会把日期类属性名统一转成小写（publishDate → publishdate），
 * 而 Astro 的字段名是大小写敏感的。这里把常见的小写别名映射回标准写法，
 * 让两种拼写都能通过校验，避免在 Obsidian 中编辑后构建失败。
 */
function normalizeKeys(data: unknown): unknown {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return data
  const obj = data as Record<string, unknown>
  const aliases: Record<string, string> = {
    publishdate: 'publishDate',
    updateddate: 'updatedDate',
    slug: 'customSlug'
  }
  for (const [lower, canonical] of Object.entries(aliases)) {
    if (!(canonical in obj) && lower in obj) {
      obj[canonical] = obj[lower]
      delete obj[lower]
    }
  }
  // 标签容错：允许写成 input, python 这样的逗号分隔字符串，自动转成数组
  if (typeof obj.tags === 'string') {
    obj.tags = obj.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)
  }
  return obj
}

// Define blog collection
const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.preprocess(
      normalizeKeys,
      z.object({
        // Required
        title: z.string().max(60),
        description: z.string().max(160),
        publishDate: z.coerce.date(),
        // Optional
        updatedDate: z.coerce.date().optional(),
        heroImage: z
          .object({
            src: image(),
            alt: z.string().optional(),
            inferSize: z.boolean().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            color: z.string().optional()
          })
          .optional(),
        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        language: z.string().optional(),
        draft: z.boolean().default(false),
        pin: z.boolean().optional(),
        // Special fields
        comment: z.boolean().default(true)
      })
    )
})

// Define notes collection — 个人随记（短内容，整篇直接展示，无详情页）
// 注意：字段需与 blog schema 保持兼容（title/description/updatedDate），
// 否则主题内部组件的集合联合类型会报类型错误
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.preprocess(
      normalizeKeys,
      z.object({
        // 随记标题可留空（默认空字符串），正文即内容
        title: z.string().max(60).default(''),
        description: z.string().max(160).optional(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        draft: z.boolean().default(false)
      })
    )
})

export const collections = { blog, notes }
