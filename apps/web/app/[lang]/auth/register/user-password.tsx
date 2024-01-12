type UserData = {
  password: string
}

type UserPasswordProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({}: UserPasswordProps) {
  return <div>password</div>
}
