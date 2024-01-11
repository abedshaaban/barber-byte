type UserData = {
  email: string
}

type UserEmailProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({}: UserEmailProps) {
  return <div>email</div>
}
