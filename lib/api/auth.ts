export const signup = async (userEmail: string, userPassword: string) => {
  try {
    const apiUrl = '/api/signup'
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, userPassword }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '회원가입 실패')
    } else {
      return data.message
    }
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const login = async (userEmail: string, userPassword: string) => {
  try {
    const apiUrl = 'api/login'
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, userPassword }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '회원가입 실패')
    } else {
      return data.message
    }
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
