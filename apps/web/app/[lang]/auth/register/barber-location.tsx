import Map from '@repo/ui/map'

type UserData = {
  location: [number, number]
}

type UserLocationProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({ updateFields, location }: UserLocationProps) {
  return (
    <div className={'h-full w-full'}>
      <Map updateState={updateFields} location={location} />
    </div>
  )
}
