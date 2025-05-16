import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const type = searchParams.get('type')

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
  }

  if (!type) {
    throw new Error('팔로우 타입이 존재하지 않습니다.')
  }

  const apiUrl = `${process.env.API_URL}/api/v1/follow/${userId}/${type}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '유저 팔로우 리스트 가져오기 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('유저 팔로우 리스트 가져오기 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
