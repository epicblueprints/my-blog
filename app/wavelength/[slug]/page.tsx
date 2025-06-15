import { notFound } from 'next/navigation'
import { getWavelengthPosts } from 'app/wavelength/utils'
import { baseUrl } from 'app/sitemap'
import { PostLayout } from 'app/components/post-layout'

export async function generateStaticParams() {
  const posts = getWavelengthPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  const post = getWavelengthPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/wavelength/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Wavelength({ params }) {
  const post = getWavelengthPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/wavelength/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Saurav Ray',
            },
          }),
        }}
      />
      <PostLayout post={post} />
    </>
  )
} 