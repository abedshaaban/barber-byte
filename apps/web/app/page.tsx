import LayoutTextImage from '@repo/ui/layoutTextImage'

export default function Page() {
  return (
    <div>
      <section className="flex w-full justify-center border-y-2 p-3 md:p-9">
        <p className="max-w-[700px] text-justify text-2xl">
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
