import { useRef, useState } from 'react'
import { generateImage } from '@repo/helpers/account'
import type { AppointmentType } from '@repo/helpers/types'
import { useAutosizeTextArea } from '@web/helpers'

import { Button } from '@repo/ui/button'
import { Label } from '@repo/ui/label'
import { Skeleton } from '@repo/ui/skeleton'
import { Textarea } from '@repo/ui/textarea'
import { cn } from '@repo/ui/util'

type UserFormProps = Partial<AppointmentType> & {
  updateFields: (fields: Partial<AppointmentType>) => void
  reservation: any
}

export default function Index({
  description,
  updateFields,
  reservation,
  img_url
}: UserFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedImageNumber, setSelectedImageNumber] = useState<null | number>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [AIImages, setAIImages] = useState<{ url: string; id: number }[] | []>([
    {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-cktUSxa7TqUUdFSJgduFJ4a9/user-HXZ6S6Z6vEctBoxnawJhMqro/img-4tSLoAoOnjsFepwc0m0lPARt.png?st=2024-01-21T19%3A20%3A40Z&se=2024-01-21T21%3A20%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-21T19%3A43%3A26Z&ske=2024-01-22T19%3A43%3A26Z&sks=b&skv=2021-08-06&sig=K/2%2BY4KItyUL/w4n7xo3jPX8XTb9E743islvom6Vefw%3D',
      id: 1
    },
    {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-cktUSxa7TqUUdFSJgduFJ4a9/user-HXZ6S6Z6vEctBoxnawJhMqro/img-ul4rUGmugmnvIiipnulnXQLk.png?st=2024-01-21T19%3A20%3A39Z&se=2024-01-21T21%3A20%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-21T19%3A43%3A26Z&ske=2024-01-22T19%3A43%3A26Z&sks=b&skv=2021-08-06&sig=PMeQWR7DyK2pqofQXwIYTY5Rs7IuNMZiyXfrFb3er4k%3D',
      id: 2
    },
    {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-cktUSxa7TqUUdFSJgduFJ4a9/user-HXZ6S6Z6vEctBoxnawJhMqro/img-MoQtY7ruiHx0BXzt64PMf47V.png?st=2024-01-21T19%3A20%3A40Z&se=2024-01-21T21%3A20%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-21T19%3A43%3A26Z&ske=2024-01-22T19%3A43%3A26Z&sks=b&skv=2021-08-06&sig=rz4pelIJdzrChlmE9w0oMiNUjdPEVOo4c5fyFQZ/aYE%3D',
      id: 3
    },
    {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-cktUSxa7TqUUdFSJgduFJ4a9/user-HXZ6S6Z6vEctBoxnawJhMqro/img-5HJXxfA7LCgEIKLJBCeve4BL.png?st=2024-01-21T19%3A20%3A39Z&se=2024-01-21T21%3A20%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-21T19%3A43%3A26Z&ske=2024-01-22T19%3A43%3A26Z&sks=b&skv=2021-08-06&sig=8ANvdbiHjdLNRUVelQxDDVh7FzTXro6DMEiC5UTCmBQ%3D',
      id: 4
    }
  ])

  useAutosizeTextArea(textAreaRef.current, description as string)

  async function handleGenerateImages() {
    setLoading(true)

    if (!description) {
      setLoading(false)
      setErrorMessage('No prompt entered.')
      return
    }
    updateFields({ img_url: '', img_id: null })

    setErrorMessage('')

    const res = await generateImage({
      n: 4,
      size: '256x256',
      prompt: description as string
    })

    if (res.status === true) {
      setAIImages(res.data)
      setErrorMessage('')
    } else {
      setErrorMessage(`${res.message} Please wait 1 min and try again.`)
    }

    console.log(res)
    setLoading(false)
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className={'w-full text-center text-red-600'}>{errorMessage}</div>

      <div className={'flex w-full flex-wrap justify-center gap-3'}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => {
              return (
                <Skeleton
                  className={'h-[150px] w-[150px] md:h-[180px] md:w-[180px]'}
                  key={index}
                />
              )
            })
          : AIImages.length > 0
            ? AIImages?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      'bg-muted h-[150px] w-[150px] md:h-[180px] md:w-[180px]',
                      'cursor-pointer rounded-lg border-4',
                      selectedImageNumber === index || img_url === item?.url
                        ? 'border-green-300'
                        : 'border-transparent'
                    )}
                    onClick={() => {
                      setSelectedImageNumber(index)
                      updateFields({ img_url: item?.url, img_id: item?.id })
                    }}
                  >
                    <img
                      src={item?.url}
                      alt={`haircut ${index + 1}`}
                      className={'h-full w-full rounded-lg object-cover object-center'}
                    />
                  </div>
                )
              })
            : null}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={'prompt'}>{reservation.imageGeneration.prompt}</Label>

        <Textarea
          id={'prompt'}
          ref={textAreaRef}
          placeholder={reservation.imageGeneration.promptExample}
          value={description}
          onChange={(e) => {
            updateFields({ description: e.target.value })
          }}
          maxLength={700}
          className={'bg-white dark:bg-neutral-800'}
          disabled={loading}
        />

        <Button
          type={'button'}
          disabled={loading}
          onClick={handleGenerateImages}
          variant={'outline'}
        >
          {reservation.imageGeneration.generate}
        </Button>
      </div>
    </div>
  )
}
