import { useEffect, useCallback } from 'react'

type UseInfiniteScrollProps = {
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  const handleScroll = useCallback(() => {
    const scrollOffset = 100
    const scrolledToBottom =
      Math.abs(window.innerHeight + window.scrollY - document.documentElement.scrollHeight) <
      scrollOffset

    if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
}
