type UserData = {
  first_name: string
  last_name: string
  birth_date: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({}: UserFormProps) {
  return <div>user form</div>
}
