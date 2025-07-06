'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  subItems?: ChecklistItem[]
}

interface ChecklistTopic {
  id: string
  title: string
  items: ChecklistItem[]
}

export function Checklist({ topics }: { topics: ChecklistTopic[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>(
    topics.reduce((acc, topic) => ({ ...acc, [topic.id]: true }), {})
  )

  const toggleTopicCollapse = (topicId: string) => {
    setCollapsedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }

  const ChecklistItemRenderer = ({ item, level = 0 }: { item: ChecklistItem; level?: number }) => {
    const [isItemCollapsed, setIsItemCollapsed] = useState(true)

    return (
      <li key={item.id} className={`mb-1 ml-${level * 4}`}>
        <div className="flex items-center">
          <Image
            src={item.completed ? '/images/checked-box.svg' : '/images/unchecked-box.svg'}
            alt={item.completed ? 'Checked' : 'Unchecked'}
            className="mr-2 w-4 h-4"
            width={16}
            height={16}
          />
          <span
            className={`text-neutral-700 dark:text-neutral-300 ${
              item.completed ? 'line-through text-neutral-500' : ''
            }`}
          >
            {item.text}
          </span>
          {item.subItems && item.subItems.length > 0 && (
            <button
              onClick={() => setIsItemCollapsed(!isItemCollapsed)}
              className="ml-2 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isItemCollapsed ? 'rotate-0' : 'rotate-180'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          )}
        </div>
        {!isItemCollapsed && item.subItems && item.subItems.length > 0 && (
          <ul className="mt-2">
            {item.subItems.map((subItem) => (
              <ChecklistItemRenderer key={subItem.id} item={subItem} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className="my-8 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold text-lg flex justify-between items-center"
      >
        Monthly Checklist
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4">
          {topics.map((topic) => (
            <div key={topic.id} className="mb-4">
              <button
                onClick={() => toggleTopicCollapse(topic.id)}
                className="w-full text-left font-medium text-md mb-2 flex justify-between items-center"
              >
                {topic.title}
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    collapsedTopics[topic.id] ? 'rotate-0' : 'rotate-180'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {!collapsedTopics[topic.id] && (
                <ul>
                  {topic.items.map((item) => (
                    <ChecklistItemRenderer key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
