import fs from 'fs'
import path from 'path'
import { transformMarkdownToMDX } from './markdown-transformer'

export type Metadata = {
  title: string
  publishedAt: string
  summary?: string
  image?: string
}

export type Post = {
  metadata: Metadata
  slug: string
  content: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    // No frontmatter found, return default metadata
    return {
      metadata: {
        title: 'Untitled',
        publishedAt: new Date().toISOString().split('T')[0],
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

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx' && !file.startsWith('.'))
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const { metadata, content } = parseFrontmatter(rawContent)
  
  // Transform markdown patterns to MDX components for discovery logs
  const fileName = path.basename(filePath, '.mdx')
  const isDiscoveryLog = fileName.includes('discovery_log') || metadata.title?.toLowerCase().includes('discovery log')
  const transformedContent = isDiscoveryLog ? transformMarkdownToMDX(content, 'discovery-log') : content
  
  return { metadata, content: transformedContent }
}

export function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
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