'use client'

import MDEditor, { ICommand, TextAreaTextApi } from '@uiw/react-md-editor'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import rehypeSanitize from 'rehype-sanitize'
import { defaultSchema } from 'hast-util-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { initializePost, uploadImage } from '@/lib/api/diary'
import { commands } from '@/helper/commands'
import rehypeRaw from 'rehype-raw'
import { LinkModal } from './Modal'

export default function PostEditor() {
  const [content, setContent] = useState<string>('')
  const [linkValue, setLinkValue] = useState<string>('')
  const [linkTextValue, setLinkTextValue] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [linkApi, setLinkApi] = useState<TextAreaTextApi | null>(null)
  const isInitialized = useRef<boolean>(false)
  const [imgApi, setImgApi] = useState<TextAreaTextApi | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isInitialized.current) {
      mutation.mutate()
      isInitialized.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mutation = useMutation({
    mutationFn: initializePost,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 초기화 실패:', error.message)
      } else {
        console.error('다이어리 초기화:', error)
      }
    },
  })

  const handleChange = (value?: string) => {
    setContent(value || '')
  }

  const linkCommand: ICommand = {
    ...commands.link,
    execute: (_, api) => {
      setLinkApi(api)
      setModalIsOpen(true)
    },
  }

  const handleInsertLink = () => {
    const markdownLink = `[${linkTextValue}](${linkValue})`
    linkApi?.replaceSelection(markdownLink)
    setModalIsOpen(false)
    setLinkTextValue('')
    setLinkValue('')
  }

  const imageUploadCommand: ICommand = {
    ...commands.image,
    execute: (_, api) => {
      setImgApi(api)
      fileInputRef.current?.click()
    },
  }

  const imageUploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log(data)
      const url = data.data.imageUrl
      const markdownImage = `![Image](${url})<!--rehype:style=width: 500px; height: auto;-->`

      if (imgApi) {
        imgApi.replaceSelection(markdownImage)
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 초기화 실패:', error.message)
      } else {
        console.error('다이어리 초기화:', error)
      }
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      imageUploadMutation.mutate(file)
    }
  }

  const customSanitize = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': [...(defaultSchema.attributes?.['*'] || []), 'style'],
    },
    tagNames: [...(defaultSchema.tagNames || []), 'img', 'div'],
  }

  return (
    <div className="h-[100%] flex-1">
      <MDEditor
        value={content}
        onChange={handleChange}
        previewOptions={{
          rehypePlugins: [[rehypeRaw], [rehypeSanitize, customSanitize]],
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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  )
}
