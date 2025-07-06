import { getBlogPosts } from 'app/blog/utils'
import { getNotesPosts } from 'app/notes/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const notes = getNotesPosts().map((post) => ({
    url: `${baseUrl}/notes/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ['', '/blog', '/notes'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...notes]
}
