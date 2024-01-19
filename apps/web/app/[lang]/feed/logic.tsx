'use client'

import { useEffect, useState } from 'react'
import { getPosts } from '@repo/helpers/account'
import Post from '@web/components/post'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

export default function Logic() {
  const user = useSelector((state: RootState) => state.user)
  const [pageNumber, setPageNumber] = useState<{ currentPage: number; lastPage: number }>(
    { currentPage: 1, lastPage: 1 }
  )
  const [posts, setPosts] = useState([])

  async function getData() {
    if (pageNumber.currentPage <= pageNumber.lastPage) {
      const res = await getPosts({ page: pageNumber.currentPage })

      setPosts((prev) => {
        return [...prev, ...res.data]
      })
    }
  }

  useEffect(() => {
    const runFunc = async () => {
      await getData()
    }

    runFunc()
  }, [])

  return (
    <div className={'flex w-full flex-col items-center justify-center'}>
      <Post />
      {posts?.map((val) => {
        return <>{val?.handle}</>
      })}
    </div>
  )
}
