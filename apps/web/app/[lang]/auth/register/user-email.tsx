import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'

type UserData = {
  email: string
}

type UserEmailProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  register: any
}

export default function Index({ email, updateFields, register }: UserEmailProps) {
  return (
    <div className={'grid w-full max-w-sm items-center gap-1.5'}>
      <Label htmlFor={'email'}>{register.userEmail.email}</Label>
      <Input
        type={'email'}
        id={'email'}
        placeholder={'example@domian'}
        required
        value={email}
        onChange={(e) => {
          updateFields({ email: e.target.value })
        }}
        className={'bg-white dark:bg-neutral-800'}
      />
    </div>
  )
}
