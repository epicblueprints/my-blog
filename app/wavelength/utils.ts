import { getMDXData } from 'app/lib/mdx'
import path from 'path'

export function getWavelengthPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'wavelength', 'posts'))
} 