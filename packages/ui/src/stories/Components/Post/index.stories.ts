import type { Meta, StoryObj } from '@storybook/react'

import Post from './component'

const meta: Meta<typeof Post> = {
  title: 'components/Post',
  component: Post,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    user: {
      url: 'https://github.com/abedshaaban.png',
      fallback: 'AB',
      first_name: 'Abed',
      last_name: 'Shaaban'
    },
    created_at: '12:00pm 1-01-2004',
    caption: 'Be the reason someone smiles today.'
  }
}
