import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/mail/temp-password`
  const { email } = await req.json()

  if (!email) {
    throw new Error('임시 비밀번호 발송 실패')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
    }

    // ! 응답 바뀌면 수정
    //   const data = await response.json()
    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('임시 비밀번호 발송 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
