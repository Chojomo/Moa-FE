import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const diaryId = searchParams.get('diaryId')

  const token = req.headers.get('authorization')
  const apiUrl = `${process.env.API_URL}/api/v1/diaries/${diaryId}`

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 게시물 가져오기 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('다이어리 가져오기 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
