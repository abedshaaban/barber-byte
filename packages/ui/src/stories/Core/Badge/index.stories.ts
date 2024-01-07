import { Meta, StoryObj } from '@storybook/react'

import Badge from './component'

const meta: Meta<typeof Badge> = {
  title: 'core/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline']
    }
  }
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    text: 'Badge'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary'
  }
}

export const Destructive: Story = {
  args: { variant: 'destructive', text: 'Destructive' }
}

export const Outline: Story = {
  args: { variant: 'outline', text: 'Outline' }
}
