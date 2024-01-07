import { Meta, StoryObj } from '@storybook/react'

import Separator from './component'

const meta: Meta<typeof Separator> = {
  title: 'core/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Separator>

export const Base: Story = {}
