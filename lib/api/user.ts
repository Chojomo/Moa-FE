export const getUser = async ({ userId }: { userId: string }) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/user?userId=${userId}`

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // token 있는 경우만
    if (token) {
      headers.Authorization = token
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
      throw new Error(data.error || '유저 페이지 가져오기 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const getUserDiaries = async ({ userId }: { userId: string }) => {
  const apiUrl = `/api/user/diaries?userId=${userId}`

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
  }

  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
      throw new Error(data.error || '유저 작성 다이어리 리스트 가져오기 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
