import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/auth/register`
  const { userEmail, userPassword } = await req.json()

  console.log(`req: ${userEmail}, ${userPassword}`)
  console.log(`apiUrl: ${apiUrl}`)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, userPassword }),
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
    } else {
      // ! 응답 바뀌면 수정
      //   const data = await response.json()
      return new Response(JSON.stringify({ massage: '성공' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  } catch (error) {
    console.error('회원가입 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
