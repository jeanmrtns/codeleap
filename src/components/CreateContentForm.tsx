import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoadingSpinner } from './LoadingSpinner'

interface CreateContentFormProps {
  onFinishCreate?: () => void
}

const CreateContentFormSchema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  content: z.string().min(3, 'Content must have at least 3 characters'),
})

type CreateContentFormData = z.infer<typeof CreateContentFormSchema>
type PageParams = {
  username: string
}

export function CreateContentForm({
  onFinishCreate = () => {},
}: CreateContentFormProps) {
  const { username } = useParams() as PageParams

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateContentFormData>({
    resolver: zodResolver(CreateContentFormSchema),
  })

  async function handleCreateContent(data: CreateContentFormData) {
    const requestBody = {
      username,
      title: data.title,
      content: data.content,
    }

    await fetch('https://dev.codeleap.co.uk/careers/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-type': 'application/json',
      },
    })

    onFinishCreate()
  }

  const title = watch('title')
  const content = watch('content')

  const isSomeFieldEmpty = !title || !content

  return (
    <div className="rounded-2xl border border-[#999999] p-6">
      <strong className="font-bold text-[22px] block mb-6">
        What&apos; on your mind?
      </strong>

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleCreateContent)}
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            {...register('title')}
            placeholder="Hello world"
            type="text"
            id="title"
            className="rounded-lg px-[11px] py-2 text-sm leading-none outline-none border border-[#777777] hover:border-black focus:border-black"
          />
          {errors.title ? (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            {...register('content')}
            placeholder="Content here"
            id="content"
            className="rounded-lg min-h-[74px] px-[11px] py-2 text-sm leading-none outline-none border border-[#777777] hover:border-black focus:border-black"
          />
          {errors.content ? (
            <span className="text-xs text-red-500">
              {errors.content.message}
            </span>
          ) : null}
        </fieldset>

        <div className="flex justify-end">
          <button
            disabled={isSomeFieldEmpty || isSubmitting}
            type="submit"
            className="bg-[#7695EC] uppercase text-white px-8 py-2 items-center justify-center rounded-lg font-bold leading-none focus:outline-none hover:bg-[#4571ec] transition-colors disabled:bg-zinc-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner /> : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
