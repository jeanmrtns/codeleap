import Image from 'next/image'
import { SignInModal } from '@/components/SignInModal'
import codeleapLogo from '@/assets/codeleap_logo_black 1.png'

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <Image src={codeleapLogo} priority alt="Text with Codeleap written" />
      <SignInModal />
    </div>
  )
}
