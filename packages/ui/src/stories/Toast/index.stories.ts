import { Meta, StoryObj } from '@storybook/react'

import Toast from './component'

const meta: Meta<typeof Toast> = {
  title: 'components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Toast>

export const Base: Story = {}
