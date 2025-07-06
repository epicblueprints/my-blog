import { notFound } from 'next/navigation'
import { getNotesPosts } from 'app/notes/utils'
import { NotesPostLayout } from 'app/components/notes-post-layout'
import { formatDate } from 'app/lib/mdx'
import { Checklist } from 'app/components/checklist'
import { readMDXFile } from 'app/lib/mdx'
import path from 'path'
import fs from 'fs'

export async function generateStaticParams() {
  const posts = getNotesPosts()
  const postsByMonth = posts.reduce((acc, post) => {
    const year = new Date(post.metadata.publishedAt).getFullYear()
    const month = new Date(post.metadata.publishedAt).getMonth() + 1
    const monthKey = `${year}/${String(month).padStart(2, '0')}`
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(post)
    return acc
  }, {} as Record<string, typeof posts>)

  return Object.keys(postsByMonth).map((monthKey) => ({
    slug: monthKey.split('/'),
  }))
}

export function generateMetadata({ params }) {
  const { slug } = params
  const [year, month] = slug
  const monthName = new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })

  return {
    title: `Notes - ${monthName}`,
    description: `A collection of my thoughts and discoveries from ${monthName}.`,
  }
}

export default function NotesMonthPage({ params }) {
  const { slug } = params
  const [year, month] = slug
  const posts = getNotesPosts()
    .filter(post => {
      const postYear = new Date(post.metadata.publishedAt).getFullYear()
      const postMonth = new Date(post.metadata.publishedAt).getMonth() + 1
      return postYear === Number(year) && postMonth === Number(month)
    })
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())

  if (posts.length === 0) {
    notFound()
  }

  const monthName = new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
  
  let checklistData: any[] = []
  const checklistFilePath = path.join(process.cwd(), 'app', 'notes', 'posts', year, month, 'checklist.mdx')
  if (fs.existsSync(checklistFilePath)) {
    const { checklist } = readMDXFile(checklistFilePath)
    checklistData = checklist || []
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {monthName}
      </h1>
      {checklistData.length > 0 && (
        <div className="mb-8">
          <Checklist topics={checklistData} />
        </div>
      )}
      <div className="space-y-6">
        {posts.map((post) => (
          <details key={post.slug} className="group">
            <summary className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  {post.metadata.title}
                </h2>
                {post.metadata.publishedAt && !isNaN(new Date(post.metadata.publishedAt).getTime()) && (
                  <time className="text-sm text-neutral-500 dark:text-neutral-500 ml-4">
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                )}
              </div>
              <svg className="w-5 h-5 text-neutral-500 group-open:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="prose dark:prose-invert max-w-none pt-4">
              <NotesPostLayout post={post} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}