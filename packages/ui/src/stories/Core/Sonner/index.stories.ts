import { Meta, StoryObj } from '@storybook/react'

import Sonner from './component'

const meta: Meta<typeof Sonner> = {
  title: 'core/Sonner',
  component: Sonner,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Sonner>

export const Base: Story = {}
