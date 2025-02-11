import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/auth/change/password`
  const token = req.headers.get('authorization')

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  const { currentPassword, newPassword, confirmNewPassword } = await req.json()

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
    }
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('비밀번호 변경 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
