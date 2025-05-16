import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const image = formData.get('image') as File
  const diaryId = formData.get('diaryId')

  const apiUrl = `${process.env.API_URL}/api/v1/diaries/${diaryId}/image`
  const token = req.headers.get('authorization')

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!image) {
    throw new Error('파일이 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리 초기화가 되지 않았습니다.')
  }

  try {
    const newFormData = new FormData()
    newFormData.append('image', image)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: newFormData,
    })

    const data = await response.json()

    console.log(response)

    if (!response.ok) {
      throw new Error(data.error || '다이어리 이미지 업로드 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('다이어리 이미지 업로드 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
