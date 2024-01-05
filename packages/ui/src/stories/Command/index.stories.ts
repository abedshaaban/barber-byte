import { Meta, StoryObj } from '@storybook/react'

import Command from './component'

const meta: Meta<typeof Command> = {
  title: 'components/Command',
  component: Command,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Command>

export const Base: Story = {}
