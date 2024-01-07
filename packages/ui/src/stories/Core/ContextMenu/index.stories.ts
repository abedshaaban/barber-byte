import { Meta, StoryObj } from '@storybook/react'

import ContextMenu from './component'

const meta: Meta<typeof ContextMenu> = {
  title: 'core/Context Menu',
  component: ContextMenu,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof ContextMenu>

export const Base: Story = {}
