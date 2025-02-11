import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const diaryId = searchParams.get('diaryId')

  const apiUrl = `${process.env.API_URL}/api/v1/diaries/${diaryId}/comments`
  const token = req.headers.get('authorization')
  const { commentContents } = await req.json()

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        commentContents,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 게시 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('댓글 게시 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const diaryId = searchParams.get('diaryId')
  const commentId = searchParams.get('commentId')

  const apiUrl = `${process.env.API_URL}/api/v1/diaries/${diaryId}/comments/${commentId}`
  const token = req.headers.get('authorization')
  const { commentContents } = await req.json()

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  if (!commentId) {
    throw new Error('댓글이 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        commentContents,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '대댓글 수정 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('대댓글 수정 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { diaryId, commentId } = await req.json()

  const apiUrl = `${process.env.API_URL}/api/v1/diaries/${diaryId}/comments/${commentId}`
  const token = req.headers.get('authorization')

  if (!token) {
    throw new Error('인증 헤더가 없습니다.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  if (!commentId) {
    throw new Error('댓글이 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '댓글 삭제 실패')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error('댓글 삭제 에러:', error)
    return new Response(JSON.stringify({ error: '서버 에러 발생' }), { status: 500 })
  }
}
