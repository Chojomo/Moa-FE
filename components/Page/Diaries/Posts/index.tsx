'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getDiarys } from '@/lib/api/diary'
import { Diary } from '@/types/diary'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import Post from './Post'

type PostsProps = {
  sort: string
}

export default function Posts({ sort }: PostsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['diaries', sort],
    queryFn: ({ pageParam = 0 }) => {
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

  useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  return (
    <div className="w-full flex-grow flex flex-col bg-background">
      <div className="w-full flex flex-col flex-grow diaries-padding gap-[40px] sm:gap-[0px] mb-[95px]">
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
