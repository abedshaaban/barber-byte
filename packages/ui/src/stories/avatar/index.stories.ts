import { Meta, StoryObj } from '@storybook/react'

import AspectRatio from './component'

const meta: Meta<typeof AspectRatio> = {
  title: 'components/Avatar',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof AspectRatio>

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
