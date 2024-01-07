import { Meta, StoryObj } from '@storybook/react'

import DropdownMenu from './component'

const meta: Meta<typeof DropdownMenu> = {
  title: 'core/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Base: Story = {}
