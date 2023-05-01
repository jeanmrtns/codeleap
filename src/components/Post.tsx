import { useParams } from 'next/navigation'
import { formatDistance } from 'date-fns'
import { DeletePostModal } from './DeletePostModal'
import { EditPostModal } from './EditPostModal'

interface PostProps {
    post: {
        id: number
        username: string
        created_datetime: Date
        title: string
        content: string
    }
}

type PageParams = {
    username: string
}

export function Post({ post }: PostProps) {
    const { username } = useParams() as PageParams

    return (
        <div className="border border-[#999999] rounded-2xl overflow-hidden">
            <header className="bg-[#7695EC] p-6 flex items-center justify-between">
                <strong className="font-bold text-[22px] text-white">{post.title}</strong>

                {
                    post.username === username ? (
                        <div className='flex items-center gap-6'>
                            <DeletePostModal postId={post.id} />
                            <EditPostModal post={post} />
                        </div>
                    ) : null
                }
            </header>

            <article className="flex flex-col p-6">
                <span className="font-bold text-lg text-[#777777] flex items-center justify-between">
                    @{post.username}

                    <time className="font-normal">{formatDistance(new Date(post.created_datetime), new Date(), {
                        addSuffix: true
                    })}</time>
                </span>
                <div className='prose lg:prose-xl mt-4'>
                    {post.content}
                </div>
            </article>
        </div>
    )
}