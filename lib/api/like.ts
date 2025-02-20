export const postLike = async ({ diaryId }: { diaryId: string }) => {
  const apiUrl = `/api/diary/like?diaryId=${diaryId}`
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
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 좋아요 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const getLikes = async ({ diaryId }: { diaryId: string }) => {
  const apiUrl = `/api/diary/like?diaryId=${diaryId}`

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 좋아요 목록 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
