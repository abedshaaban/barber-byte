import type { Meta, StoryObj } from '@storybook/react'

import Header from './component'

const meta: Meta<typeof Header> = {
  title: 'components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Abed Shaaban',
      img_url: 'https://github.com/abedshaaban.png'
    }
  }
}

export const LoggedOut: Story = {}