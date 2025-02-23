'use client'

import { useEffect, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getDiarys } from '@/lib/api/diary'
import { Diary } from '@/types/diary'
import Post from './Post'

type PostsProps = {
  sort: string
}

export default function Posts({ sort }: PostsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['diaries', sort],
    queryFn: ({ pageParam = 1 }) => {
      const isDesktop = window.innerHeight >= 1000
      return isDesktop
        ? getDiarys({ pageParam, pageSize: 8, sortType: sort })
        : getDiarys({ pageParam, pageSize: 4, sortType: sort })
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.pageInfo.isLast ? undefined : lastPage.pageInfo.page
      return nextPage
    },
    initialPageParam: 0,
  })

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

  return (
    <div className="w-full flex-grow flex flex-col bg-background">
      <div className="w-full flex flex-col flex-grow px-[10%] gap-[40px] sm:gap-[0px] mb-[95px]">
        {data?.pages.flatMap((page) =>
          page.data.diaryPreviewList.map((post: Diary, index: number) => (
            <Post key={post.diaryId} index={index} post={post} />
          ))
        )}
      </div>

      <div className="flex justify-center items-center p-4">
        {isFetchingNextPage && <p>로드 중...</p>}
      </div>
    </div>
  )
}
