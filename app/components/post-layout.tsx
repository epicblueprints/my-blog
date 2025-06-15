import { formatDate } from 'app/lib/mdx'
import { getReadingTime, getWordCount } from 'app/lib/reading-time'
import { CustomMDX } from 'app/components/mdx'
import { TableOfContents } from 'app/components/table-of-contents'
import type { Post } from 'app/lib/mdx'

export function PostLayout({ post }: { post: Post }) {
  const readingTime = getReadingTime(post.content)
  const wordCount = getWordCount(post.content)

  return (
    <>
      <TableOfContents />
      <section>
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex flex-col mt-2 mb-8 text-sm">
          <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
            <time className="text-sm">
              {formatDate(post.metadata.publishedAt)}
            </time>
            <div className="flex items-center space-x-2">
              <span>{wordCount.toLocaleString()} words</span>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </section>
    </>
  )
} 