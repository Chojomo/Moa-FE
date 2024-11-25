import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('pageNumber') || '0'
  const pageSize = searchParams.get('pageSize') || '4'
  const sortType = searchParams.get('sortType') || 'viewCount'

  const apiUrl = `${process.env.API_URL}/api/v1/diaries/list?pageNumber=${page}&pageSize=${pageSize}&sortType=${sortType}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 게시물 가져오기 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('다이어리 가져오기 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/diaries/publish`
  const token = req.headers.get('authorization')
  const { diaryId, diaryTitle, diaryContents, diaryThumbnail, isDiaryPublic } = await req.json()

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리 초기화가 되지 않았습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        diaryId,
        diaryTitle,
        diaryContents,
        diaryThumbnail,
        isDiaryPublic,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 게시 실패')
    }

    return new Response(JSON.stringify({ message: '다이어리가 게시되었습니다.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('다이어리 게시 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const apiUrl = `${process.env.API_URL}/api/v1/diaries`
  const token = req.headers.get('authorization')
  const { diaryId, diaryTitle, diaryContents, isDiaryPublic } = await req.json()

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리 초기화가 되지 않았습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        diaryId,
        diaryTitle,
        diaryContents,
        isDiaryPublic,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 이미지 업로드 실패')
    }

    return new Response(JSON.stringify({ message: '포스트가 임시저장되었습니다.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('다이어리 자동 저장 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
