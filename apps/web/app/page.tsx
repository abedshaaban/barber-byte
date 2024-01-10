import LayoutTextImage from '@repo/ui/layoutTextImage'

export default function Page() {
  return (
    <main>
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
    </main>
  )
}
