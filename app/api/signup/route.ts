import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/auth/register`
  const { userEmail, userPassword } = await req.json()

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
    }

    //   const data = await response.json()
    return new Response(JSON.stringify({ message: '성공' }), {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    throw new Error('이메일을 입력해 주세요.')
  }

  const apiUrl = `${process.env.API_URL}/api/v1/auth/email/check?email=${email}`

  console.log('NODE_ENV:', process.env.API_URL)

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    console.log(data)

    if (!response.ok) {
      console.log(data.message)

      throw new Error(data.message)
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }
}
