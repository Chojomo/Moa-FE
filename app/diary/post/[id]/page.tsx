import Post from '@/components/Page/Diary/Post'

export default function EditPostPage({ params }: { params: { id?: string } }) {
  return <Post diaryId={params.id} />
}
