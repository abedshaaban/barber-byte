import { Meta, StoryObj } from '@storybook/react'

import Label from './component'

const meta: Meta<typeof Label> = {
  title: 'core/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Label>

export const Base: Story = {
  args: {
    text: 'Label'
  }
}
