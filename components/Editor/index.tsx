'use client'

import MDEditor, { ICommand } from '@uiw/react-md-editor'
import { useState, useCallback } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { commands } from '@/helper/commands'
import { LinkModal } from './Modal'

export default function PostEditor() {
  const [content, setContent] = useState<string>('')
  const [linkValue, setLinkValue] = useState<string>('')
  const [linkTextValue, setLinkTextValue] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [textApi, setTextApi] = useState<any>(null)

  const handleChange = (value?: string) => {
    setContent(value || '')
  }

  const linkCommand: ICommand = {
    ...commands.link,
    execute: (_, api) => {
      setTextApi(api)
      setModalIsOpen(true)
    },
  }

  const handleInsertLink = () => {
    const markdownLink = `[${linkTextValue}](${linkValue})`
    textApi.replaceSelection(markdownLink)
    setModalIsOpen(false)
    setLinkTextValue('')
    setLinkValue('')
  }

  const imageUploadCommand: ICommand = {
    ...commands.image,
    execute: () => {
      document.getElementById('fileInput')?.click()
    },
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
        commands={[
          commands.title1,
          commands.title2,
          commands.divider,
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.divider,
          linkCommand,
          commands.quote,
          imageUploadCommand,
          commands.code,
          commands.divider,
          commands.unorderedListCommand,
          commands.orderedListCommand,
        ]}
      />
      <LinkModal
        isOpen={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
        textValue={linkTextValue}
        handleTextChange={useCallback((e) => setLinkTextValue(e.target.value), [])}
        linkValue={linkValue}
        handleLinkChange={useCallback((e) => setLinkValue(e.target.value), [])}
        handleAddClick={handleInsertLink}
      />
    </div>
  )
}
