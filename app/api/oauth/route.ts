import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type')
  const apiUrl = `${process.env.API_URL}/oauth2/authorization/${type}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    })

    console.log(response)
    // return new NextResponse(JSON.stringify({ message: '성공!' }), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // })
  } catch (error) {
    console.error('소셜 로그인 에러:', error)
    return new NextResponse(JSON.stringify({ error: '서버 에러 발생' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
