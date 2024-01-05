import { Meta, StoryObj } from '@storybook/react'

import Menubar from './component'

const meta: Meta<typeof Menubar> = {
  title: 'components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Menubar>

export const Base: Story = {}
