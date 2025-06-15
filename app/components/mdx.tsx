import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

// Client component for interactive features
import { LogEntryClient } from './log-entry-client'

function Table({ data }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function Pre({ children, ...props }) {
  return (
    <pre className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  )
}

function CalloutBox({ children, type = 'info' }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
    success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
    error: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100'
  }
  
  return (
    <div className={`border-l-4 border rounded-r-lg p-4 my-6 ${styles[type]}`}>
      {children}
    </div>
  )
}

interface LogEntryProps {
  time: string
  children: React.ReactNode
  details?: React.ReactNode
}

const LogEntry: React.FC<LogEntryProps> = ({ time, children, details }) => {
  if (details) {
    // Use client component for interactive features
    return <LogEntryClient time={time} details={details}>{children}</LogEntryClient>
  }

  // Server component for simple entries
  return (
    <div className="mb-6 border-l-2 border-neutral-300 dark:border-neutral-600 pl-4">
      <div className="flex items-start gap-3">
        <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400 shrink-0 min-w-[70px] mt-0.5">
          {time}
        </span>
        <span className="text-neutral-400 dark:text-neutral-500 mt-0.5">•</span>
        <div className="flex-1 min-w-0">
          <div className="text-neutral-900 dark:text-neutral-100 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function DayDivider({ date }) {
  return (
    <div className="my-8 flex items-center">
      <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700"></div>
      <div className="px-4">
        <time className="text-sm font-medium text-neutral-600 dark:text-neutral-400 bg-white dark:bg-black px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700">
          {date}
        </time>
      </div>
      <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700"></div>
    </div>
  )
}

function BlockQuote({ children }) {
  return (
    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30 pl-6 pr-4 py-4 my-6 rounded-r-lg">
      <div className="text-blue-900 dark:text-blue-100 italic font-medium relative">
        <svg className="absolute -left-2 -top-2 w-8 h-8 text-blue-500/20 dark:text-blue-400/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
        <div className="relative z-10">{children}</div>
      </div>
    </blockquote>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  blockquote: BlockQuote,
  Table,
  CalloutBox,
  LogEntry,
  DayDivider,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
