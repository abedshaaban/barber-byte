import { Meta, StoryObj } from '@storybook/react'

import AspectRatio from './component'

const meta: Meta<typeof AspectRatio> = {
  title: 'core/Aspect Ratio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof AspectRatio>

export const Base: Story = {
  args: {
    ratio: 16 / 9
  }
}
