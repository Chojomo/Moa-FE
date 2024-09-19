export const survey = async (nickName: string, message: string) => {
  try {
    const apiUrl = '/api/survey'
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickName, message }),
    })

    const data = await response.json()

    if (!response) {
      throw new Error(data.error || '등록 실패')
    }

    return data.message
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
