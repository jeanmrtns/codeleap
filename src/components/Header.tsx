import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-[#7695EC] px-6 md:px-[37px] py-[27px]">
      <div className="container mx-auto md:px-6">
        <Link href="/">
          <h1 className="font-bold text-[22px] text-white leading-3">
            CodeLeap Network
          </h1>
        </Link>
      </div>
    </header>
  )
}
