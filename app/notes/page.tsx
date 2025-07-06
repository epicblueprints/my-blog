import { NotesPosts } from 'app/components/notes-posts'

export const metadata = {
  title: 'Notes',
  description: 'My weekly and monthly rhythm - what I\'m reading, watching, thinking, and feeling',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">
        Notes
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-base">
        My monthly rhythm — tracking what I read, watch, listen to, and think about. 
        A personal chronicle of curiosity, frustrations, and discoveries.
      </p>
      <NotesPosts />
    </section>
  )
} 