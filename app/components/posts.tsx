import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'
import { getNotesPosts } from 'app/notes/utils'
import { formatDate } from 'app/lib/mdx'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div className="h-[80vh] overflow-y-auto">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4">
              <p className="text-neutral-600 dark:text-neutral-400 w-full md:w-[140px] md:flex-shrink-0 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <div className="flex flex-col">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

function getMonthlyNotesAggregates() {
  const allNotes = getNotesPosts()
  
  if (allNotes.length === 0) return []
  
  const postsByMonth = allNotes
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .reduce((acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear()
      const month = new Date(post.metadata.publishedAt).getMonth() + 1
      const monthKey = `${year}/${String(month).padStart(2, '0')}`
      if (!acc[monthKey]) {
        acc[monthKey] = {
          monthKey,
          year,
          month,
          posts: [],
          // Use the latest post date from this month as the representative date
          latestDate: post.metadata.publishedAt
        }
      }
      acc[monthKey].posts.push(post)
      // Update to the latest date if this post is newer
      if (new Date(post.metadata.publishedAt) > new Date(acc[monthKey].latestDate)) {
        acc[monthKey].latestDate = post.metadata.publishedAt
      }
      return acc
    }, {} as Record<string, { monthKey: string; year: number; month: number; posts: any[]; latestDate: string }>)

  return Object.values(postsByMonth).map(monthData => ({
    type: 'notes' as const,
    slug: monthData.monthKey,
    metadata: {
      title: new Date(monthData.year, monthData.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' }),
      publishedAt: monthData.latestDate,
    },
    postCount: monthData.posts.length
  }))
}

export function AllPosts() {
  const allBlogs = getBlogPosts()
  const monthlyNotes = getMonthlyNotesAggregates()
  
  // Combine all posts and monthly note aggregates
  const allPosts = [
    ...allBlogs.map(post => ({ ...post, type: 'blog' as const })),
    ...monthlyNotes
  ]

  return (
    <div className="h-[80vh] overflow-y-auto">
      {allPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={`${post.type}-${post.slug}`}
            className="flex flex-col space-y-1 mb-4"
            href={post.type === 'blog' ? `/blog/${post.slug}` : `/notes/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4">
              <p className="text-neutral-600 dark:text-neutral-400 w-full md:w-[140px] md:flex-shrink-0 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <div className="flex flex-col">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                  <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                    ({post.type}{post.type === 'notes' && 'postCount' in post ? ` • ${post.postCount} entries` : ''})
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
