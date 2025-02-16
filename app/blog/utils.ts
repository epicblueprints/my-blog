import { getMDXData } from 'app/lib/mdx'
import path from 'path'

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export { formatDate } from 'app/lib/mdx'
