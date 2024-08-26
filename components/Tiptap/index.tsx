'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown'

import Toolbar from './Toolbar'

export default function Tiptap() {
  const [content, setContent] = useState('gg')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content,
    onUpdate({ editor: updatedEditor }) {
      setContent(updatedEditor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content) {
      console.log('Setting content:', content)
      editor.commands.setContent(content)
    }
  }, [editor, content])

  return (
    <div>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
