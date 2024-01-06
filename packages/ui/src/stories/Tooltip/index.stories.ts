import { Meta, StoryObj } from '@storybook/react'

import Tooltip from './component'

const meta: Meta<typeof Tooltip> = {
  title: 'components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Base: Story = {}
