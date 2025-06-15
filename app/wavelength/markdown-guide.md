# Discovery Log Markdown Guide

Write the discovery logs in pure markdown! The system will automatically convert markdown patterns into the required format.

## Markdown Patterns

### Day Dividers
Write a level 2 heading with the date:
```markdown
## December 6, 2024
```
This gets converted to: `<DayDivider date="December 6, 2024" />`

### Simple Log Entries  
Write time in bold followed by a bullet point:
```markdown
**2:34 PM** • Your discovery or insight here
```
This gets converted to: `<LogEntry time="2:34 PM">Your discovery or insight here</LogEntry>`

### Log Entries with Details
Add a blockquote after the main entry for detailed explanations:
```markdown
**2:34 PM** • Your main insight here

> Detailed explanation, context, links, code snippets, or deeper thoughts about this discovery
```
This gets converted to: `<LogEntry time="2:34 PM" details="Detailed explanation...">Your main insight here</LogEntry>`

## Benefits

✅ **Clean markdown** - No more HTML-like tags  
✅ **Automatic conversion** - Patterns become components  
✅ **Easy to write** - Natural markdown syntax  
✅ **Version control friendly** - Pure text, easy to diff  
✅ **Backup to existing format** - If auto-conversion fails, you can still use `<LogEntry>` tags

## Time Format
Always use 12-hour format: `2:34 PM`, `11:45 AM`, etc.