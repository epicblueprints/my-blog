'use client'

import React, { useState } from 'react'

interface LogEntryClientProps {
  time: string
  children: React.ReactNode
  details: React.ReactNode
}

export const LogEntryClient: React.FC<LogEntryClientProps> = ({ time, children, details }) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors flex items-center gap-2 group"
          >
            <span className="transform transition-transform duration-200 group-hover:scale-110">
              {isExpanded ? '▼' : '▶'}
            </span>
            <span className="font-medium">{isExpanded ? 'Hide details' : 'Show details'}</span>
          </button>
          {isExpanded && (
            <div className="mt-4 p-4 bg-neutral-800 dark:bg-neutral-900/80 rounded-lg border border-neutral-700 dark:border-neutral-600 text-sm text-neutral-200 dark:text-neutral-300 leading-relaxed shadow-lg backdrop-blur-sm">
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 