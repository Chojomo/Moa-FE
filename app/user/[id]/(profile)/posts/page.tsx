'use client'

import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { POSTS } from '@/helper/constants/posts'
import { Post } from '@/components/Page/User/Posts'
import { getUserDiaries } from '@/lib/api/user'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

// 임시 타입
type PostType = {
  index: number
  src: string
  writer: string
  title: string
  description: string
}

type PostsProps = {
  params: { id: string }
}

export default function Posts({ params }: PostsProps) {
  const { id: userId } = params

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => {
      const isDesktop = window.innerHeight >= 1000
      return isDesktop
        ? getUserDiaries({ userId, pageParam, pageSize: 8 })
        : getUserDiaries({ userId, pageParam, pageSize: 4 })
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage?.pageInfo.isLast)
      const nextPage = lastPage?.pageInfo.isLast ? undefined : lastPage.pageInfo.page
      return nextPage
    },
    initialPageParam: 0,
  })

  useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  console.log(data?.pages[0].data)

  return (
    <div className="w-full animate-fadeIn flex flex-wrap justify-center gap-10 pt-[5%] pb-[10%]">
      {POSTS.map((post: PostType) => (
        <Post key={post.index} post={post} />
      ))}
    </div>
  )
}
