/**
 * Transform markdown patterns into custom MDX components
 * This allows writing in pure markdown that gets converted to the required format
 */

export function transformDiscoveryLogMarkdown(content) {
  let transformed = content;

  // Transform day dividers
  // Pattern: ## December 6, 2024
  transformed = transformed.replace(
    /^## ([A-Za-z]+ \d{1,2}, \d{4})$/gm,
    '<DayDivider date="$1" />'
  );

  // Transform log entries with details
  // Pattern: **2:34 PM** • Entry text
  // 
  // > Detailed explanation here
  transformed = transformed.replace(
    /\*\*([0-9]{1,2}:[0-9]{2} (?:AM|PM))\*\* • ([^\n]+)\n\n> ([^<]+?)(?=\n\n|\n*$)/gms,
    '<LogEntry time="$1" details="$3">$2</LogEntry>'
  );

  // Transform simple log entries without details
  // Pattern: **2:34 PM** • Entry text
  transformed = transformed.replace(
    /\*\*([0-9]{1,2}:[0-9]{2} (?:AM|PM))\*\* • ([^\n]+)(?!\n\n>)/gm,
    '<LogEntry time="$1">$2</LogEntry>'
  );

  return transformed;
}

export function transformMarkdownToMDX(content, type = 'discovery-log') {
  if (type === 'discovery-log') {
    return transformDiscoveryLogMarkdown(content);
  }
  return content;
} 