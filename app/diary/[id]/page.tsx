type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  return (
    <div>
      <p>{params.id}</p>
      <p>{params.id}</p>
      <p>{params.id}</p>
    </div>
  )
}
