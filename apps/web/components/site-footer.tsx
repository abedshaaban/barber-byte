import Footer from '@repo/ui/footer'

export default function SiteFooter() {
  return (
    <>
      <Footer
        metaData={{
          name: 'Barber Byte',
          img_url: '/icons/logo.svg',
          nav: [
            {
              title: 'RESOURCES',
              links: [
                { name: 'Home', path: '' },
                { name: 'About', path: '' },
                { name: 'Contact', path: '' }
              ]
            },
            {
              title: 'FOLLOW US',
              links: [{ name: 'Github', path: '' }]
            },
            {
              title: 'LEGAL',
              links: [
                { name: 'Privacy Policy', path: '' },
                { name: 'Terms & Conditions', path: '' }
              ]
            }
          ]
        }}
      />
    </>
  )
}
