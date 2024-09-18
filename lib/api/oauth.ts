export const oauth = async (type: 'kakao' | 'naver' | 'google') => {
  try {
    const apiUrl = `/api/oauth?type=${type}`

    const response = await fetch(apiUrl, {
      method: 'GET',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('oauth 로그인 실패')
    } else {
      return data.message
    }
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
