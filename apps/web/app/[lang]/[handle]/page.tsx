import Logic from './logic'

export default function Page({ params }: { params: { handle: string } }) {
  const handle = params.handle.substring(3)

  return (
    <>
      <Logic handle={handle} />
    </>
  )
}
