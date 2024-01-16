import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
      <h1 className={'text-3xl md:text-5xl'}>( • ᴖ • ｡) User Not Found</h1>

      <p>
        User page is not found. Go{' '}
        <Link href={`/`} className={'underline'}>
          to home
        </Link>
      </p>
    </div>
  )
}
