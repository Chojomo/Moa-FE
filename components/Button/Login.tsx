'use client'

import { useAuthStore } from '@/store/useAuth'
import Button from '.'

export default function LoginButton() {
  const { isLogin, login, logout } = useAuthStore()

  const handleLogin = () => {
    return !isLogin ? login() : logout()
  }

  return (
    <Button type="button" className="bg-btn-bg rounded-full py-5 px-5" onClick={handleLogin}>
      로그인 상태 변경
    </Button>
  )
}
