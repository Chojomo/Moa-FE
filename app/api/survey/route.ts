import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { nickName, message } = await req.json()
  try {
    return new Response(JSON.stringify({ message: { nickName, message } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('회원가입 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
