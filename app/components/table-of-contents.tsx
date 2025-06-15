'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface TocItem {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const tocItems: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      title: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    }))
    
    setToc(tocItems)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  if (toc.length === 0) return null

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50 group">
        {/* TOC Button - Always visible */}
        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg p-2 shadow-lg">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>

        {/* TOC Content - Shows on hover */}
        <div className="absolute left-full ml-4 top-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
          <div className="bg-white/95 dark:bg-black/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 shadow-xl min-w-64 max-w-80 max-h-[70vh]">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2 sticky top-0 bg-white/95 dark:bg-black/95">
              Table of Contents
            </h4>
            
            <nav className="space-y-1 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
              {toc.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-sm transition-colors duration-150 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded ${
                    activeId === item.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/30'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                  style={{
                    marginLeft: `${(item.level - 1) * 12}px`
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile TOC Backdrop */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile TOC */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        {/* Mobile TOC Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-full p-3 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {mobileOpen ? (
              <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </button>

        {/* Mobile TOC Content - Shows on click */}
        <div className={`absolute bottom-full mb-4 right-0 transition-all duration-200 ease-out ${
          mobileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
        }`}>
          <div className="bg-white/95 dark:bg-black/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 shadow-xl w-80 max-w-[90vw] max-h-[60vh]">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2 sticky top-0 bg-white/95 dark:bg-black/95">
              Table of Contents
            </h4>
            
            <nav className="space-y-1 overflow-y-auto max-h-[50vh] pr-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
              {toc.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm transition-colors duration-150 hover:text-blue-600 dark:hover:text-blue-400 py-2 px-2 rounded ${
                    activeId === item.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/30'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                  style={{
                    marginLeft: `${(item.level - 1) * 12}px`
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
} 