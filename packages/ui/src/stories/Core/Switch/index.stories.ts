import { Meta, StoryObj } from '@storybook/react'

import Switch from './component'

const meta: Meta<typeof Switch> = {
  title: 'core/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Switch>

export const Base: Story = {}
