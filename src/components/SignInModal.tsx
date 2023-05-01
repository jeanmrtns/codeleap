'use client'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

const signInFormSchema = z.object({
  username: z.string().min(4, 'Username must have at least 4 characters'),
})

type signInData = z.infer<typeof signInFormSchema>

export function SignInModal() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signInData>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn(data: signInData) {
    await router.push(`/${data.username}`)
  }

  const username = watch('username')

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 rounded bg-zinc-900 text-zinc-50">
          Signin
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-200 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[22px] font-bold">
            Welcome to CodeLeap network!
          </Dialog.Title>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <fieldset className="mb-[15px] mt-6 flex flex-col gap-2">
              <label
                className="text-left text-black font-normal text-[15px]"
                htmlFor="name"
              >
                Please enter your username
              </label>
              <input
                className="rounded-lg px-[11px] py-2 text-sm leading-none outline-none border border-[#777777] hover:border-black focus:border-black"
                id="name"
                placeholder="John doe"
                {...register('username')}
              />
              {errors.username ? (
                <span className="text-xs text-red-500">
                  {errors.username.message}
                </span>
              ) : null}
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button
                disabled={!username || username.length < 4 || !!errors.username}
                type="submit"
                className="bg-[#7695EC] uppercase text-white px-8 py-2 items-center justify-center rounded-lg font-bold leading-none focus:outline-none hover:bg-[#4571ec] transition-colors disabled:bg-zinc-500 disabled:cursor-not-allowed"
              >
                Enter
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
