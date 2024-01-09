import Header from '@repo/ui/header'

export default function SiteHeader() {
  return (
    <>
      <Header
        metaData={{
          name: 'Barber Byte',
          img_url: '/icons/logo.svg',
          links: [
            { name: 'Home', path: '/' },
            { name: 'Feed', path: '/feed' }
          ]
        }}
      />
    </>
  )
}
