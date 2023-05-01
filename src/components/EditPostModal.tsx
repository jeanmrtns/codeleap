import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import penIcon from '@/assets/pen-icon.svg'
import { useGetContents } from '@/hooks/useGetContents';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface Content {
    id: number
    username: string
    created_datetime: Date
    title: string
    content: string
}

interface EditPostModalProps {
    post: Content
}

const EditPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(3),
})

type EditPostData = z.infer<typeof EditPostSchema>

export function EditPostModal({ post }: EditPostModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { refetch } = useGetContents()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<EditPostData>({
        resolver: zodResolver(EditPostSchema),
        defaultValues: {
            content: post.content,
            title: post.title
        }
    })

    async function handleEditPost(data: EditPostData) {
        const requestBody = {
            title: data.title,
            content: data.content,
        }

        await fetch(`https://dev.codeleap.co.uk/careers/${post.id}/`, {
            method: 'PATCH',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-type': 'application/json'
            }
        })

        setIsOpen(false)
        refetch()
    }

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
    }

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger asChild>
                <button className='hover:text-zinc-500/50' title="Edit post" onClick={handleOpenModal}>
                    <Image src={penIcon} alt="image of a white pen" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-zinc-200 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-black m-0 text-[22px] font-bold">
                    Edit item
                </Dialog.Title>
                <form onSubmit={handleSubmit(handleEditPost)} className='mt-6 flex flex-col gap-6'>
                    <fieldset className='flex flex-col gap-2'>
                        <label htmlFor="title">Title</label>
                        <input {...register('title')} placeholder='Hello world' type="text" id='title' className="rounded-lg px-[11px] py-2 text-sm leading-none outline-none border border-[#777777] hover:border-black focus:border-black" />
                        {errors.title ? <span className='text-xs text-red-500'>{errors.title.message}</span> : null}
                    </fieldset>

                    <fieldset className='flex flex-col gap-2'>
                        <label htmlFor="content">Content</label>
                        <textarea {...register('content')} placeholder='Content here' id='content' className="rounded-lg min-h-[74px] px-[11px] py-2 text-sm leading-none outline-none border border-[#777777] hover:border-black focus:border-black" />
                        {errors.content ? <span className='text-xs text-red-500'>{errors.content.message}</span> : null}
                    </fieldset>

                    <div className="flex gap-4 justify-end">
                        <Dialog.Close asChild>
                            <button onClick={handleCloseModal} className="text-black font-bold border border-black hover:bg-zinc-100 focus:shadow-black inline-flex h-8 items-center justify-center rounded-lg px-[33px] leading-none outline-none focus:shadow-[0_0_0_2px] transition-colors">
                                Cancel
                            </button>
                        </Dialog.Close>
                        <button type="submit" className="bg-[#47B960] text-white px-8 py-2 items-center justify-center rounded-lg font-bold leading-none focus:outline-none hover:bg-[#47B960]/80 transition-colors disabled:bg-zinc-500 disabled:cursor-not-allowed">
                        {isSubmitting ? <LoadingSpinner /> : 'Save'}
                        </button>
                    </div>
                </form>
                <Dialog.Close asChild>
                    <button
                        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                        onClick={handleCloseModal}
                    >
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
            </Dialog.Root>
    )
}