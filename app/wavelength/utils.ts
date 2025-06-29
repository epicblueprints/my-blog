import { getMDXData } from 'app/lib/mdx'
import path from 'path'

export function getWavelengthPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'wavelength', 'posts'))
}

export function getWavelengthPost(slug: string) {
  const allPosts = getWavelengthPosts()
  return allPosts.find((p) => p.slug === slug)
} 