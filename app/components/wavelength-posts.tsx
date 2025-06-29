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

  const postsByMonth = allWavelengths
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .reduce((acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear()
      const month = new Date(post.metadata.publishedAt).getMonth() + 1
      const monthKey = `${year}/${String(month).padStart(2, '0')}`
      if (!acc[monthKey]) {
        acc[monthKey] = []
      }
      acc[monthKey].push(post)
      return acc
    }, {} as Record<string, typeof allWavelengths>)

  return (
    <div className="space-y-6">
      {Object.keys(postsByMonth).map((monthKey) => {
        const [year, month] = monthKey.split('/')
        const monthName = new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
        return (
          <Link
            key={monthKey}
            className="block group"
            href={`/wavelength/${monthKey}`}
          >
            <article className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors duration-200">
              <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {monthName}
              </h2>
            </article>
          </Link>
        )
      })}
    </div>
  )
} 