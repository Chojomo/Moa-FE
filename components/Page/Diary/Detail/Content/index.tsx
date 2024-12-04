import { Icon } from '@/components/Icon'
import MDEditor from '@uiw/react-md-editor'

type ContentProps = {
  content: string
  isDiaryOwner: boolean
  isDiaryPublic: boolean
}

export default function Content({ content, isDiaryOwner, isDiaryPublic }: ContentProps) {
  return (
    <div className="w-full break-words">
      {isDiaryOwner && (
        <p className="flex justify-end items-center gap-[7px] pt-[25px]">
          <span className="text-[13px] font-semibold">{isDiaryPublic ? '공개' : '비공개'}</span>
          {isDiaryPublic ? (
            <Icon name="Public" width={20} height={20} />
          ) : (
            <Icon name="Unpublic" width={20} height={20} />
          )}
        </p>
      )}
      <MDEditor.Markdown className="px-[25px] py-[10%]" source={content} />
    </div>
  )
}
