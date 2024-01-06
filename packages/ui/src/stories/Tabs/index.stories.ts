import { Meta, StoryObj } from '@storybook/react'

import Tabs from './component'

const meta: Meta<typeof Tabs> = {
  title: 'components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Base: Story = {}
