import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import { useMutation } from '@tanstack/react-query'
import { oauth } from '@/lib/api/oauth'

export default function OAuth() {
  const { mutate } = useMutation({
    mutationFn: (type: 'kakao' | 'naver' | 'google') => oauth(type),
    onSuccess: (data) => {
      console.log('OAuth 요청 성공:', data)
    },
    onError: (error) => {
      console.error('OAuth 요청 실패:', error)
    },
  })

  const handleOAuthLogin = (type: 'kakao' | 'naver' | 'google') => {
    mutate(type)
  }

  return (
    <div className="flex-center gap-[50px] mt-[10px]">
      <Button type="button" ariaLabel="kakao auth button" onClick={() => handleOAuthLogin('kakao')}>
        <Icon name="Kakao" width={60} height={60} />
      </Button>
      <Button type="button" ariaLabel="naver auth button" onClick={() => handleOAuthLogin('naver')}>
        <Icon name="Naver" width={60} height={60} />
      </Button>
      <Button
        type="button"
        ariaLabel="google auth button"
        onClick={() => handleOAuthLogin('google')}
      >
        <Icon name="Google" width={60} height={60} />
      </Button>
    </div>
  )
}
