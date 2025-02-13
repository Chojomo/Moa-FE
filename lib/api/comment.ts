export const postComment = async ({
  diaryId,
  commentContents = '',
}: {
  diaryId: string
  commentContents: string
}) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/diary/comment?diaryId=${diaryId}`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
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
      throw new Error(data.error || '댓글 게시 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const patchComment = async ({
  diaryId,
  commentId,
  commentContents = '',
}: {
  diaryId: string
  commentId: string
  commentContents: string
}) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/diary/comment?diaryId=${diaryId}&commentId=${commentId}`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
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
      throw new Error(data.error || '댓글 수정 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const postReply = async ({
  diaryId,
  commentId,
  replyContents = '',
}: {
  diaryId: string
  commentId: string
  replyContents: string
}) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/diary/comment/replies?diaryId=${diaryId}&commentId=${commentId}`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  if (!commentId) {
    throw new Error('댓글이 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        replyContents,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '댓글 게시 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const patchReply = async ({
  diaryId,
  replyId,
  replyContents = '',
}: {
  diaryId: string
  replyId: string
  replyContents: string
}) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/diary/comment/replies?diaryId=${diaryId}&replyId=${replyId}`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  if (!replyId) {
    throw new Error('대댓글이 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        replyContents,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '대댓글 수정 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const deletleComment = async ({
  diaryId,
  commentId,
}: {
  diaryId: string
  commentId: string
}) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/diary/comment`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
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
      body: JSON.stringify({
        diaryId,
        commentId,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '댓글 삭제 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
