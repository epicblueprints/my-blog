import Link from 'next/link'
import { getWavelengthPosts } from 'app/wavelength/utils'
import { formatDate } from 'app/lib/mdx'

export function WavelengthPosts() {
  const allWavelengths = getWavelengthPosts()

  if (allWavelengths.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No wavelengths yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Start documenting your weekly rhythm - what you&apos;re reading, watching, and thinking about.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {allWavelengths
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
            className="block group"
            href={`/wavelength/${post.slug}`}
          >
            <article className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.metadata.title}
                </h2>
                <time className="text-sm text-neutral-500 dark:text-neutral-500 mt-1 sm:mt-0">
                  {formatDate(post.metadata.publishedAt, false)}
                </time>
              </div>
              
              {post.metadata.summary && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {post.metadata.summary}
                </p>
              )}
              
              <div className="mt-4 flex items-center text-xs text-neutral-500 dark:text-neutral-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Read more
              </div>
            </article>
          </Link>
        ))}
    </div>
  )
} 