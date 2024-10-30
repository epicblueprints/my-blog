import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello!
      </h1>
      <p className="mb-4">
       {"Vim enthusiast who believes every keystroke counts and a proud owner of a growing book collection that's constantly competing for my attention with new tech releases. Here's where I share my adventures in technology, design, and the endless pursuit of making things look just right."}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
