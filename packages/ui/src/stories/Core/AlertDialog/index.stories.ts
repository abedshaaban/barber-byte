import { Meta, StoryObj } from '@storybook/react'

import AlertDialog from './component'

const meta: Meta<typeof AlertDialog> = {
  title: 'core/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof AlertDialog>

export const Base: Story = {
  args: {
    trigger: 'Open',
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
  }
}
