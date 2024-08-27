'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

import Toolbar from './Toolbar'

export default function Tiptap() {
  const [title, setTitle] = useState('')
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Title:', title)
    console.log('Content:', content)
  }

  return (
    <div className="w-[100vw] h-[100vh] flex-center px-[2%] pt-[10%] pb-[2%] gap-[50px]">
      <form onSubmit={handleSubmit} className="w-[50%] h-[100%] flex-center flex-col">
        <div className="flex flex-col w-[100%] h-[20%]">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[100%] flex-grow text-[28px] px-[30px] py-[20px] rounded focus:outline-none focus:ring-0"
          />
          {editor && <Toolbar editor={editor} />}
        </div>
        <EditorContent
          editor={editor}
          className="bg-nav-bg w-[100%] focus:outline-none focus:ring-0 flex-grow overflow-y-auto"
          onClick={() => editor?.commands.focus()}
        />
      </form>
      <div className="w-[50%] h-[100%] overflow-y-auto p-4 bg-white">
        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
