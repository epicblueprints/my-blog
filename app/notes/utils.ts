import { getMDXData } from 'app/lib/mdx'
import path from 'path'

export function getNotesPosts() {
  const allMdxData = getMDXData(path.join(process.cwd(), 'app', 'notes', 'posts'))
  return allMdxData.filter(post => !post.slug.endsWith('/checklist'))
}

export function getNotesPost(slug: string) {
  const allPosts = getNotesPosts()
  return allPosts.find((p) => p.slug === slug)
} 