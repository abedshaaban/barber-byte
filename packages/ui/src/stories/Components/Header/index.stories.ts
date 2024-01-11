import type { Meta, StoryObj } from '@storybook/react'

import Header from '../../../elements/header'

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
    },
    metaData: {
      name: 'Barber Byte',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Browse', path: '/feed' }
      ]
    }
  }
}

export const LoggedOut: Story = {
  args: {
    metaData: {
      name: 'Barber Byte',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Browse', path: '/feed' }
      ]
    },
    authText: {
      login: 'Login',
      register: 'Register'
    }
  }
}
