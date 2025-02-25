import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
  }

  const apiUrl = `${process.env.API_URL}/api/v1/users/my-page/${userId}`
  const token = req.headers.get('authorization')

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = token
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers,
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '유저 페이지 가져오기 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('유저 페이지 가져오기 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
