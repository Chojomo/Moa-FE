'use client'

import { useEffect } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import Prism from 'prismjs'
import imageCompression from 'browser-image-compression'

import { Editor } from '@toast-ui/react-editor'
import { PreviwMode } from '@/types'

type EditorProps = {
  content: string
  editorRef: React.MutableRefObject<Editor | null>
  preview: PreviwMode
}

export default function PostEditor({ content = '', editorRef, preview }: EditorProps) {
  useEffect(() => {
    const editorEl = document.getElementsByClassName('toastui-editor-defaultUI')[0]
    if (editorEl) {
      if (editorEl.classList.contains('toastui-editor-dark')) {
        editorEl.classList.remove('toastui-editor-dark')
      } else {
        editorEl.classList.add('toastui-editor-dark')
      }
    }
  }, [])

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code', 'quote'],
    ['scrollSync'],
  ]

  const onUploadImage = async (
    blob: Blob | File,
    callback: (url: string, text?: string) => void
  ) => {
    try {
      if (blob instanceof File) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }

        const compressedFile = await imageCompression(blob, options)

        const formData = new FormData()
        formData.append('file', compressedFile)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('error')
        }

        const result = await response.json()
        if (result && result.url) {
          callback(result.url)
        } else {
          throw new Error('error')
        }
      } else {
        throw new Error('error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="toastui-editor-dark">
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '}
          initialEditType="markdown"
          previewStyle={preview}
          previewHighlight={false}
          hideModeSwitch
          height="calc(100vh - 170px)"
          theme=""
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
          hooks={{
            addImageBlobHook: onUploadImage,
          }}
        />
      )}
    </div>
  )
}
