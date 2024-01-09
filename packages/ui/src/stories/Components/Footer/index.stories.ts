import type { Meta, StoryObj } from '@storybook/react'

import Footer from './component'

const meta: Meta<typeof Footer> = {
  title: 'components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    metaData: {
      name: 'Barber Byte',
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
    }
  }
}
