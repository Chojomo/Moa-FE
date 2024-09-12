'use client'

import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

export default function PostEditor() {
  const [content, setContent] = useState<string>('')

  const handleChange = (value?: string) => {
    setContent(value || '')
  }

  return (
    <div>
      <MDEditor
        value={content}
        onChange={handleChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        className="custom-editor"
      />
    </div>
  )
}
