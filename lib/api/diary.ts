export const initializePost = async () => {
  try {
    const apiUrl = '/api/diary/initialize'
    const token = localStorage.getItem('authToken')

    if (!token) {
      throw new Error('로그인 상태를 확인하세요.')
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 초기화 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
