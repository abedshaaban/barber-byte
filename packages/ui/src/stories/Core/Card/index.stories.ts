import { Meta, StoryObj } from '@storybook/react'

import Card from './component'

const meta: Meta<typeof Card> = {
  title: 'core/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Card>

export const Base: Story = {}
