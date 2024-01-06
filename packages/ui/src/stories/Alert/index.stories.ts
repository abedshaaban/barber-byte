import { Meta, StoryObj } from '@storybook/react'

import Alert from './component'

const meta: Meta<typeof Alert> = {
  title: 'core/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive']
    }
  }
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Heads up!',
    description: 'You can add core and dependencies to your app using the cli.'
  }
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    description: 'Your session has expired. Please log in again.'
  }
}
