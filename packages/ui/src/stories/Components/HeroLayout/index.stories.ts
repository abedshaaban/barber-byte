import type { Meta, StoryObj } from '@storybook/react'

import Layout from './component'

const meta: Meta<typeof Layout> = {
  title: 'components/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
