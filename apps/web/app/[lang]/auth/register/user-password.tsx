import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'

type UserData = {
  password: string
}

type UserPasswordProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({ password, updateFields }: UserPasswordProps) {
  return (
    <div className={'grid w-full max-w-sm items-center gap-1.5'}>
      <Label htmlFor={'email'}>Password</Label>
      <Input
        type={'password'}
        id={'email'}
        placeholder={'********'}
        min={8}
        minLength={8}
        required
        value={password}
        onChange={(e) => {
          updateFields({ password: e.target.value })
        }}
      />
    </div>
  )
}
