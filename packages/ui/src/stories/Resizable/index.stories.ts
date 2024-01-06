import { Meta, StoryObj } from '@storybook/react'

import Resizable from './component'

const meta: Meta<typeof Resizable> = {
  title: 'components/Resizable',
  component: Resizable,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Resizable>

export const Base: Story = {}
