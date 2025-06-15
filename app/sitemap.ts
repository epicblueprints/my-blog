import { getBlogPosts } from 'app/blog/utils'
import { getWavelengthPosts } from 'app/wavelength/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const wavelengths = getWavelengthPosts().map((post) => ({
    url: `${baseUrl}/wavelength/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ['', '/blog', '/wavelength'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...wavelengths]
}
