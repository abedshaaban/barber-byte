import type { Meta, StoryObj } from '@storybook/react'

import Layout from '../../../elements/layoutTextImage'
import PostImage from '../../@assets/default-img.png'

const meta: Meta<typeof Layout> = {
  title: 'components/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'description']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    img_url: PostImage,
    title: 'Lorem Ipsum is simply dummy text',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    reverse: false
  }
}

export const Description: Story = {
  args: {
    variant: 'description',
    img_url: PostImage,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    reverse: false
  }
}
