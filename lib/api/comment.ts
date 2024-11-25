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

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
