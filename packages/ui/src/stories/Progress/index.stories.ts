import { Meta, StoryObj } from '@storybook/react'

import Progress from './component'

const meta: Meta<typeof Progress> = {
  title: 'components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Progress>

export const Base: Story = {
  args: {
    value: 33
  }
}
