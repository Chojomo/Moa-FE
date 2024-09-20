'use client'

import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { commands } from '@/helper/commands'

export default function PostEditor() {
  const [content, setContent] = useState<string>('')

  const handleChange = (value?: string) => {
    setContent(value || '')
  }

  return (
    <div className="h-[100%] flex-1">
      <MDEditor
        value={content}
        onChange={handleChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        className="custom-editor"
        style={{ whiteSpace: 'pre-wrap' }}
        height="100%"
        commands={commands}
      />
    </div>
  )
}
