import fs from 'fs'
import path from 'path'

export type Metadata = {
  title: string
  publishedAt: string
  summary?: string
  image?: string
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  subItems?: ChecklistItem[]
}

export interface ChecklistTopic {
  id: string
  title: string
  items: ChecklistItem[]
}

export type Post = {
  metadata: Metadata
  slug: string
  content: string
  checklist?: ChecklistTopic[]
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    // No frontmatter found, return default metadata
    return {
      metadata: {
        title: 'Untitled',
        publishedAt: new Date().toISOString(), // Default to current date and time
        summary: ''
      } as Metadata,
      content: fileContent.trim()
    }
  }

  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function parseChecklistContent(content: string): ChecklistTopic[] {
  const topics: ChecklistTopic[] = []
  let currentTopic: ChecklistTopic | null = null
  const lines = content.split('\n')



  let itemStack: { item: ChecklistItem; level: number }[] = []

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    const indentLevel = line.search(/\S|$/)

    if (trimmedLine.startsWith('# ')) {
      if (currentTopic) {
        topics.push(currentTopic)
      }
      currentTopic = {
        id: trimmedLine.substring(2).trim().replace(/\s/g, '-').toLowerCase(),
        title: trimmedLine.substring(2).trim(),
        items: [],
      }
      itemStack = [] // Reset item stack for new topic
    } else if (currentTopic && trimmedLine.match(/^- \[([x ])\]/)) {
      const match = trimmedLine.match(/^(- \[([x ])\]\s*)(.*)/)
      if (!match) return

      const completed = match[2] === 'x'
      const text = match[3] ? match[3].trim() : ''
      const id = `${text}-${Date.now()}-${Math.random()}`.replace(/\s/g, '-') // Simple unique ID
      const newItem: ChecklistItem = { id, text, completed }

      const currentLevel = indentLevel

      while (itemStack.length > 0 && itemStack[itemStack.length - 1].level >= currentLevel) {
        itemStack.pop()
      }

      if (itemStack.length > 0) {
        const parentItem = itemStack[itemStack.length - 1].item
        if (!parentItem.subItems) {
          parentItem.subItems = []
        }
        parentItem.subItems.push(newItem)
      } else {
        currentTopic.items.push(newItem)
      }
      itemStack.push({ item: newItem, level: currentLevel })
    }
  })

  if (currentTopic) {
    topics.push(currentTopic)
  }
  return topics
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }
  
  const files: string[] = []
  
  function readDirRecursive(currentDir: string, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      const relativeFilePath = relativePath ? path.join(relativePath, entry.name) : entry.name
      
      if (entry.isDirectory()) {
        readDirRecursive(fullPath, relativeFilePath)
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        files.push(relativeFilePath)
      }
    }
  }
  
  readDirRecursive(dir)
  return files
}

export function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const { metadata, content } = parseFrontmatter(rawContent)
  const checklist = parseChecklistContent(content) // Parse checklist content
  return { metadata, content, checklist }
}

export function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content, checklist } = readMDXFile(path.join(dir, file))
    const slug = file.replace(/\.mdx$/, '')

    return {
      metadata,
      slug,
      content,
      checklist,
    }
  })
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}