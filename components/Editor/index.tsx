'use client'

import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import Prism from 'prismjs'

import { Editor } from '@toast-ui/react-editor'

type EditorProps = {
  content: string
  editorRef: React.MutableRefObject<Editor | null>
}

export default function PostEditor({ content = '', editorRef }: EditorProps) {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ]

  return (
    <div className="pt-[100px]">
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '}
          initialEditType="markdown"
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
          previewHighlight={false}
          hideModeSwitch
          height="calc(100vh - 380px)"
          theme=""
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
    </div>
  )
}
