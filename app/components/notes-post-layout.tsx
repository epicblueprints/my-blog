import { CustomMDX } from 'app/components/mdx'
import type { Post } from 'app/lib/mdx'

export function NotesPostLayout({ post }: { post: Post }) {
  return (
    <article className="prose">
      <CustomMDX source={post.content} />
    </article>
  )
} 
