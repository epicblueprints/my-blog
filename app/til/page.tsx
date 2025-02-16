import { TilPosts } from 'app/components/til-posts'

export const metadata = {
  title: 'TIL',
  description: 'Things I\'ve learned along the way',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Today I Learned
      </h1>
      <TilPosts />
    </section>
  )
} 