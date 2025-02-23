import { Posts } from '@/components/Page/Diaries'

type Params = {
  sort: string
}

export default async function Diary({ params }: { params: Params }) {
  const { sort } = params

  return <Posts sort={sort} />
}
