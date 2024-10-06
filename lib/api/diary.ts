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
    const { diaryId } = data.data

    if (diaryId) {
      localStorage.setItem('diaryId', diaryId)
    }

    if (!response.ok) {
      throw new Error(data.error || '다이어리 초기화 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const uploadImage = async (image: File) => {
  try {
    const apiUrl = '/api/diary/image'
    const token = localStorage.getItem('authToken')
    const diaryId = localStorage.getItem('diaryId')

    if (!token) {
      throw new Error('로그인 상태를 확인하세요.')
    }

    const formData = new FormData()
    formData.append('image', image)

    if (diaryId) {
      formData.append('diaryId', diaryId)
    }

    console.log(`diaryId: ${diaryId}`)
    console.log(`uploadImage formData: ${formData}`)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 이미지 업로드 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

type AutoSave = {
  diaryTitle: string
  diaryContentse: string
  isDiaryPublic: boolean
}

export const putAutoSave = async ({
  diaryTitle = '',
  diaryContentse = '',
  isDiaryPublic = false,
}: AutoSave) => {
  try {
    const apiUrl = '/api/diary'
    const token = localStorage.getItem('authToken')
    const diaryId = localStorage.getItem('diaryId')

    if (!token) {
      throw new Error('로그인 상태를 확인하세요.')
    }

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        diaryId,
        diaryTitle,
        diaryContentse,
        isDiaryPublic,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 자동 저장 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const postThumbnail = async (image: File) => {
  const apiUrl = '/api/diary/thumbnail'
  const token = localStorage.getItem('authToken')
  const diaryId = localStorage.getItem('diaryId')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  const formData = new FormData()
  formData.append('image', image)

  if (diaryId) {
    formData.append('diaryId', diaryId)
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 썸네일 업로드 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
