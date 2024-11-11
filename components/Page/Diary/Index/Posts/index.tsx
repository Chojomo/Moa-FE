'use client'

import { useEffect, useState, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getDiarys } from '@/lib/api/diary'
import { Diary } from '@/types/diary'
import Sort from '../Sort'
import Post from './Post'

export default function Posts() {
  const [sort, setSort] = useState('popular')
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['diaries'],
    queryFn: getDiarys,
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
      <Sort sort={sort} setSort={setSort} />
      <div className="w-full flex flex-col flex-grow px-[10%] gap-[40px] sm:gap-[0px] mb-[95px]">
        {data?.pages.flatMap((page) =>
          page.data.diaryPreviewList.map((post: Diary, index: number) => (
            <Post key={post.diaryId} index={index} post={post} />
          ))
        )}
      </div>

      <div className="flex justify-center items-center p-4">
        {isFetchingNextPage && <p>로드 중...</p>}
        {/* {error && <p>Error loading data</p>} */}
      </div>
    </div>
  )
}
