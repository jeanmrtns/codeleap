import Image from 'next/image'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import trashIcon from '@/assets/trash-icon.svg'
import { useGetContents } from '@/hooks/useGetContents'

interface DeletePostModalProps {
  postId: number
}

export function DeletePostModal({ postId }: DeletePostModalProps) {
  const { refetch } = useGetContents()

  async function handleDeletePost() {
    await fetch(`https://dev.codeleap.co.uk/careers/${String(postId)}/`, {
      method: 'DELETE',
    })

    refetch()
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="hover:text-white/50" title="Delete post">
          <Image src={trashIcon} alt="image of a white trash" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#777777]/80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-black m-0 text-[22px] font-bold">
            Are you sure you want to delete this item?
          </AlertDialog.Title>
          <div className="flex mt-10 justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-black font-bold border border-black hover:bg-zinc-100 focus:shadow-black inline-flex h-8 items-center justify-center rounded-lg px-[33px] leading-none outline-none focus:shadow-[0_0_0_2px] transition-colors">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="text-white bg-[#FF5151] font-bold border border-[#FF5151] hover:bg-[#FF5151]/80 focus:shadow-black inline-flex h-8 items-center justify-center rounded-lg px-[33px] leading-none outline-none focus:shadow-[0_0_0_2px] transition-colors"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
