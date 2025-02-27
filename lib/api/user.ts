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

export const getUserDiaries = async ({
  userId,
  pageParam = 0,
  pageSize = 10,
}: {
  userId: string
  pageParam: number
  pageSize: number
}) => {
  const apiUrl = `/api/user/diaries?userId=${userId}&pageNumber=${pageParam}&pageSize=${pageSize}`

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
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
      console.log(data.error)
      throw new Error(data.error || '유저 작성 다이어리 리스트 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const getUserComments = async ({
  userId,
  pageParam = 0,
  pageSize = 10,
}: {
  userId: string
  pageParam: number
  pageSize: number
}) => {
  const apiUrl = `/api/user/comments?userId=${userId}&pageNumber=${pageParam}&pageSize=${pageSize}`

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
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
      console.log(data.error)
      throw new Error(data.error || '유저 작성 댓글 리스트 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const getUserLikes = async ({
  userId,
  pageParam = 0,
  pageSize = 10,
}: {
  userId: string
  pageParam: number
  pageSize: number
}) => {
  const apiUrl = `/api/user/likes?userId=${userId}&pageNumber=${pageParam}&pageSize=${pageSize}`

  if (!userId) {
    throw new Error('유저가 존재하지 않습니다.')
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
      console.log(data.error)
      throw new Error(data.error || '유저 좋아요 다이어리 리스트 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
