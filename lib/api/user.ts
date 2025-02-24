export const getUser = async ({ userId }: { userId: string }) => {
  const apiUrl = `/api/user?userId=${userId}`

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
      throw new Error(data.error || '유저 페이지 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
