'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useInitDiary, useAutoSaveDiary, useUploadImage } from '@/hooks/editor'

import MDEditor, { ICommand, TextAreaTextApi } from '@uiw/react-md-editor'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { commands } from '@/helper/commands'
import { defaultSchema } from 'hast-util-sanitize'

import { LinkModal } from './Modal'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

type PostEditorProps = {
  title: string
}

export default function PostEditor({ title }: PostEditorProps) {
  const [content, setContent] = useState<string>('')
  const [linkValue, setLinkValue] = useState<string>('')
  const [linkTextValue, setLinkTextValue] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const isInitialized = useRef<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imgApi, setImgApi] = useState<TextAreaTextApi | null>(null)
  const [linkApi, setLinkApi] = useState<TextAreaTextApi | null>(null)

  const { mutate: initDiary } = useInitDiary()
  const { mutate: autoSaveDiary } = useAutoSaveDiary({
    title,
    content,
    thumbnail: '',
    isDiaryPublic: false,
  })
  const { mutate: uploadImage, setOnSuccess: uploadImageOnSuccess } = useUploadImage()

  //! 다이어리 초기화
  useEffect(() => {
    if (!isInitialized.current) {
      initDiary()
      isInitialized.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //! 임시 저장
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     autoSaveDiary()
  //   }, 10000)

  //   return () => clearInterval(intervalId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [autoSaveDiary])

  const handleChange = (value?: string) => {
    setContent(value || '')
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadImage(file)
      uploadImageOnSuccess((data) => {
        const url = data.imageUrl
        const markdownImage = `![Image](${url})<!--rehype:style=width: 500px; height: auto;-->`

        if (imgApi) {
          imgApi.replaceSelection(markdownImage)
        }
      })
    }
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

  //! 코드 커맨드
  const codeCommand: ICommand = {
    ...commands.code,
    execute: (state, api) => {
      const modifyText = `\`\`\`\n${state.selectedText || ''}\n\`\`\``
      api.replaceSelection(modifyText)
    },
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
          commands.title3,
          commands.divider,
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.divider,
          linkCommand,
          commands.quote,
          imageUploadCommand,
          codeCommand,
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
