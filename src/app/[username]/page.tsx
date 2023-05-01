'use client'
import { CreateContentForm } from '@/components/CreateContentForm'
import { Header } from '@/components/Header'
import { Post } from '@/components/Post'
import { useGetContents } from '@/hooks/useGetContents'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type PageParams = {
  username: string
}

export default function Dashboard() {
  const router = useRouter()
  const { username } = useParams() as PageParams
  const { data, refetch } = useGetContents()

  useEffect(() => {
    if (!username) {
      router.push('/')
    }
  }, [username, router])

  return (
    <>
      <Header />

      <main className="container mx-auto p-6">
        <CreateContentForm onFinishCreate={refetch} />
        <div className="mt-6 flex flex-col gap-6">
          {data?.results.map((result) => (
            <Post key={result.id} post={result} />
          ))}
        </div>
      </main>
    </>
  )
}
