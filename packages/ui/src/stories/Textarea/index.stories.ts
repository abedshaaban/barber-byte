import { Meta, StoryObj } from '@storybook/react'

import Textarea from './component'

const meta: Meta<typeof Textarea> = {
  title: 'core/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Base: Story = {}
