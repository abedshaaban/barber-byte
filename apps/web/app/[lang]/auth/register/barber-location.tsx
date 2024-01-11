type UserData = {
  location: string
}

type UserLocationProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({}: UserLocationProps) {
  return <div>Barber Shop location</div>
}
