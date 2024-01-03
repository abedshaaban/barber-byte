import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../../button'

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'clicked' } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary'
  }
}

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline'
  }
}

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive'
  }
}

export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost'
  }
}

export const Icon: Story = {
  args: {
    children: '↑',
    variant: 'outline',
    size: 'icon'
  }
}
