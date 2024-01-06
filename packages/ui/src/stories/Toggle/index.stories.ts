import { Meta, StoryObj } from '@storybook/react'

import Toggle from './component'

const meta: Meta<typeof Toggle> = {
  title: 'core/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Base: Story = {}
