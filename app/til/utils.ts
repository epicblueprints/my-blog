import { getMDXData } from 'app/lib/mdx'
import path from 'path'

export function getTilPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'til', 'posts'))
}

export { formatDate } from 'app/lib/mdx' 