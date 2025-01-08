export const validateEmail = (email: string) => {
  const regExp = /^[0-9a-zA-Z]+@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regExp.test(email)
}

export const validatePassword = (password: string) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/
  return regExp.test(password)
}

export const validateChars = (password: string) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-]).+$/
  return regExp.test(password)
}

export const validateLength = (password: string) => {
  const regExp = /^[^\s]{8,20}$/
  return regExp.test(password)
}

export const validateNickname = (nickname: string) => {
  const regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,10}$/
  return regExp.test(nickname)
}
