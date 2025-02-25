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
  diaryId?: string
  diaryTitle: string
  diaryContents: string
  isDiaryPublic: boolean
}

export const putAutoSave = async ({
  diaryId,
  diaryTitle = '',
  diaryContents = '',
  isDiaryPublic = false,
}: AutoSave) => {
  try {
    const apiUrl = '/api/diary'
    const token = localStorage.getItem('authToken')
    const id = diaryId || localStorage.getItem('diaryId')

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
        diaryId: id,
        diaryTitle,
        diaryContents,
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

type Diary = {
  diaryThumbnail: string | null
} & AutoSave

export const postDiary = async ({
  diaryTitle = '',
  diaryContents = '',
  diaryThumbnail = '',
  isDiaryPublic = false,
}: Diary) => {
  const apiUrl = '/api/diary'
  const token = localStorage.getItem('authToken')
  const diaryId = localStorage.getItem('diaryId')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  if (!diaryId) {
    throw new Error('다이어리 초기화가 되지 않았습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        diaryId,
        diaryTitle,
        diaryContents,
        diaryThumbnail,
        isDiaryPublic,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 게시 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const getDiarys = async ({ pageParam = 0, pageSize = 4, sortType = 'viewCount' }) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/api/diary?pageNumber=${pageParam}&pageSize=${pageSize}&sortType=${sortType}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 게시물 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const getDiaryDetail = async ({ diaryId }: { diaryId: string }) => {
  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  const token = localStorage.getItem('authToken')
  const apiUrl = `/api/diary/detail?diaryId=${diaryId}`

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
      throw new Error(data.error || '다이어리 게시물 가져오기 실패')
    }

    return data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}

export const deletleDiary = async ({ diaryId }: { diaryId: string }) => {
  const apiUrl = `/api/diary`
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('로그인 상태를 확인하세요.')
  }

  if (!diaryId) {
    throw new Error('다이어리가 존재하지 않습니다.')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        diaryId,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '다이어리 삭제 실패')
    }

    return data.data
  } catch (error) {
    throw new Error('next 서버 요청 중 에러 발생')
  }
}
