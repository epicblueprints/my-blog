'use client'

import { useState } from 'react'

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

interface ChecklistTopic {
  id: string
  title: string
  items: ChecklistItem[]
}

export function MonthlyChecklist() {
  const [isOpen, setIsOpen] = useState(false)
  const [topics, setTopics] = useState<ChecklistTopic[]>([
    {
      id: '1',
      title: 'Books',
      items: [
        { id: '1.1', text: 'Designing Machine Learning Systems - Chapter 7', completed: false },
        { id: '1.2', text: 'Designing Machine Learning Systems - Chapter 8', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Articles',
      items: [
        { id: '2.1', text: 'The Cold Start Problem', completed: false },
        { id: '2.2', text: 'Why We Sleep', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Videos',
      items: [
        { id: '3.1', text: 'Valuable Book Club - System Design Playlist', completed: false },
      ],
    },
  ])

  const handleCheckboxChange = (topicId: string, itemId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              items: topic.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : topic
      )
    )
  }

  return (
    <div className="my-8 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold text-lg flex justify-between items-center"
      >
        Monthly Checklist - June 2025
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
              <h3 className="font-medium text-md mb-2">{topic.title}</h3>
              <ul>
                {topic.items.map((item) => (
                  <li key={item.id} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={item.completed}
                      onChange={() => handleCheckboxChange(topic.id, item.id)}
                      className="mr-2 form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className={`text-neutral-700 dark:text-neutral-300 ${
                        item.completed ? 'line-through text-neutral-500' : ''
                      }`}
                    >
                      {item.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
