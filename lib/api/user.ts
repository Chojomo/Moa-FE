export const getUser = async ({ userId }: { userId: string }) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/user?userId=${userId}`

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
