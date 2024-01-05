import { Meta, StoryObj } from '@storybook/react'

import Drawer from './component'

const meta: Meta<typeof Drawer> = {
  title: 'components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Base: Story = {}
