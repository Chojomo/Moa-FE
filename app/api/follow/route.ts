import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const apiUrl = `${process.env.API_URL}/api/v1/follow/${userId}`
  const token = req.headers.get('authorization')

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '팔로우 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('팔로우 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
