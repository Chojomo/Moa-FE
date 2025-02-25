import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'

export const useGetUser = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser({ userId }),
    enabled: !!userId,
  })
