import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
  }

  const apiUrl = `/api/v1/diaries/users/${userId}`
  const token = req.headers.get('authorization')

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  // 다른 유저의 게시물 리스트를 조회하는 데에도 인증 헤더가 필요해야 하는 건지?

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
      throw new Error(data.error || '유저 작성 다이어리 리스트 가져오기 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('유저 작성 다이어리 리스트 가져오기 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
