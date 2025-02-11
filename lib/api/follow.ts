export const postFollow = async (userId: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/follow?userId=${userId}`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  if (!userId) {
    throw new Error('존재하지 않는 유저입니다.')
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
      throw new Error(data.error || '팔로우 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
