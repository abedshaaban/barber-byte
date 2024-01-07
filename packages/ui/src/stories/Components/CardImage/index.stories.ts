import type { Meta, StoryObj } from '@storybook/react'

import CardImage from './component'

const meta: Meta<typeof CardImage> = {
  title: 'components/Card Image',
  component: CardImage,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    title: 'Locations'
  }
}
