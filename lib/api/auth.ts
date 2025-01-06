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
      throw new Error(data.error || '로그인 실패')
    } else {
      const token = response.headers.get('authorization')

      if (token) {
        localStorage.setItem('authToken', token)
      }

      return data
    }
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const findPassword = async (email: string) => {
  if (!email) {
    throw new Error('이메일 정보가 없습니다.')
  }

  try {
    const apiUrl = 'api/signin/find/password'
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '임시 비밀번호 발송 실피')
    } else {
      return data.data
    }
  } catch (e) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
