import { Meta, StoryObj } from '@storybook/react'

import HoverCard from './component'

const meta: Meta<typeof HoverCard> = {
  title: 'components/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof HoverCard>

export const Base: Story = {}
