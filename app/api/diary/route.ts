import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/diaries`
  const token = req.headers.get('authorization')
  const { diaryId, diaryTitle, diaryContentse, isDiaryPublic } = await req.json()

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리 초기화가 되지 않았습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        diaryId,
        diaryTitle,
        diaryContentse,
        isDiaryPublic,
      }),
    })

    const data = await response.json()

    console.log(response)

    if (!response.ok) {
      throw new Error(data.error || '다이어리 이미지 업로드 실패')
    }

    return new Response(JSON.stringify({ message: '포스트가 임시저장되었습니다.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('다이어리 자동 저장 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
