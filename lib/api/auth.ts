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
    const apiUrl = '/api/login'
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

      return data.data
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
    const apiUrl = '/api/signin/find/password'
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

export const getCheckEmail = async (email: string) => {
  if (!email) {
    throw new Error('이메일을 입력해 주세요.')
  }

  const apiUrl = `/api/signup?email=${email}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 })
  }
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  try {
    const apiUrl = '/api/auth/change/password'
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
      body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
    })

    const data = await response.json()

    console.log(data)

    if (!response.ok) {
      throw new Error(data.error || '비밀번호 변경 실패')
    } else {
      return data.message
    }
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
