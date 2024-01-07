import { Meta, StoryObj } from '@storybook/react'

import Popover from './component'

const meta: Meta<typeof Popover> = {
  title: 'core/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Popover>

export const Base: Story = {}
