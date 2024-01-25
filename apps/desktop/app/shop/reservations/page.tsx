'use client'

import { useEffect, useState } from 'react'
import { GetShopReservations, NEXT_PUBLIC_AI_IMAGES_URL } from '@desktop/helpers'

import { Button } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/dialog'
import { HorizontalDots } from '@repo/ui/icons'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@repo/ui/table'

export default function Reservation() {
  const [reservations, setReservations] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function getReservations() {
      const res = await GetShopReservations()

      console.log(res)

      setReservations(res.data)
    }

    getReservations()
  }, [])

  return (
    <div className={'py-9'}>
      <Table>
        <TableCaption>A list of your recent reservation.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]">ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead className="text-right">Ai Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  {item.user.gender_id === 1
                    ? 'male'
                    : item.uesr.gender_id === 2
                      ? 'female'
                      : 'null'}
                </TableCell>
                <TableCell className={'flex w-full justify-end'}>
                  <Dialog open={isDialogOpen}>
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setIsDialogOpen(!isDialogOpen)
                      }}
                      className={'flex w-full justify-end'}
                    >
                      <HorizontalDots className={'h-6 w-6 cursor-pointer'} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>AI Generated Image</DialogTitle>
                        <DialogDescription>
                          <div
                            key={index}
                            className={
                              'flex h-full w-full cursor-pointer items-center justify-center rounded-lg pt-6'
                            }
                          >
                            <img
                              src={`${NEXT_PUBLIC_AI_IMAGES_URL}/${item?.ai_image.img_url}`}
                              alt={`haircut ${index + 1}`}
                              className={
                                'h-full w-full rounded-lg object-cover object-center'
                              }
                            />
                          </div>
                          <div></div>
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className={'flex w-full flex-row justify-between'}>
                        <Button
                          type="button"
                          variant={'secondary'}
                          onClick={() => {
                            setIsDialogOpen(false)
                          }}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
