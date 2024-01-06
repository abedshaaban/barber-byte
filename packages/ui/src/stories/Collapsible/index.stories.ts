import { Meta, StoryObj } from '@storybook/react'

import Collapsible from './component'

const meta: Meta<typeof Collapsible> = {
  title: 'core/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Collapsible>

export const Base: Story = {}
