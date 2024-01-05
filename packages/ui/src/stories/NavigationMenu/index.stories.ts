import { Meta, StoryObj } from '@storybook/react'

import NavigationMenu from './component'

const meta: Meta<typeof NavigationMenu> = {
  title: 'components/Navigation Menu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof NavigationMenu>

export const Base: Story = {}
