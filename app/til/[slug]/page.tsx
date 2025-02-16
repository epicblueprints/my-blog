import { notFound } from 'next/navigation'
import { getTilPosts } from 'app/til/utils'
import { baseUrl } from 'app/sitemap'
import { PostLayout } from 'app/components/post-layout'

export async function generateStaticParams() {
  let posts = getTilPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getTilPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
  } = post.metadata

  return {
    title,
    openGraph: {
      title,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/til/${post.slug}`,
    },
    twitter: {
      card: 'summary',
      title,
    },
  }
}

export default function Til({ params }) {
  let post = getTilPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <PostLayout post={post} />
} 