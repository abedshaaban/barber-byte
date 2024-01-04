import { Meta, StoryObj } from '@storybook/react'

import Avatar from './component'

const meta: Meta<typeof Avatar> = {
  title: 'components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    url: 'https://github.com/abedshaaban.png',
    fallback: 'AB'
  }
}

export const WithOutImage: Story = {
  args: {
    url: '',
    fallback: 'AB'
  }
}
