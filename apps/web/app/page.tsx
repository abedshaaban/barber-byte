import Link from 'next/link'

import { Button } from '@repo/ui/button'
import LayoutTextImage from '@repo/ui/layoutTextImage'

export default function Page() {
  return (
    <div className="ml-[-2rem] mr-[-2rem] flex flex-col gap-9">
      <section className="relative h-[calc(100vh-56px)] max-h-[900px] w-full">
        <div className="absolute left-0 z-0 h-[calc(100vh-56px)] max-h-[900px] w-full">
          <img
            src="/images/home/barbershop.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col-reverse items-center justify-evenly gap-9 bg-[#000000a1] p-9 md:flex-row md:justify-center">
          <div className="flex max-w-[400px] flex-col gap-5 text-white">
            <h1 className="text-3xl font-bold md:text-5xl">Recreate Yourself</h1>
            <p>
              Discover the best barber shops effortlessly, reserve appointments
              seamlessly, and elevate your haircut experience
            </p>

            <Link href={'/'}>
              <Button variant={'outline'} className="w-fit text-black">
                Register
              </Button>
            </Link>
          </div>

          <div className="h-full max-h-[240px] w-full max-w-[240px]">
            <img
              src="/images/home/haircut.png"
              alt=""
              className="h-full w-full rounded-[42px] object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center p-3 md:p-9">
        <p className="max-w-[700px] text-center text-2xl">
          Barber Byte is the go-to platform for both men and women seeking top-notch hair
          services. Dive into a world of style, convenience, and personalized grooming.
          Join us in redefining the way you approach your next haircut!
        </p>
      </section>

      <LayoutTextImage
        title={'Discover Your Style with Ease'}
        description={`Unearth the finest barber shops tailored to your preferences. Browse through a curated list of top-rated establishments, ensuring a match for every style seeker.`}
        img_url={'/turborepo.svg'}
      />

      <LayoutTextImage
        title={'Hassle-Free Appointment Booking'}
        description={`Say goodbye to waiting in queues. With Barber Byte, scheduling your next haircut is just a click away. Reserve your slot at the best barber shops effortlessly.`}
        img_url={'/turborepo.svg'}
        reverse={true}
      />

      <LayoutTextImage
        title={'Personalized Grooming Experience'}
        description={`Tailor your grooming journey. Barber Byte keeps track of your style preferences, ensuring each visit surpasses expectations. Your haircut, your way, every time.`}
        img_url={'/turborepo.svg'}
      />
    </div>
  )
}
