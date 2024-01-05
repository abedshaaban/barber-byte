import { Meta, StoryObj } from '@storybook/react'

import Dialog from './component'

const meta: Meta<typeof Dialog> = {
  title: 'components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Base: Story = {}
