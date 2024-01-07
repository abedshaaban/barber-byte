import { Meta, StoryObj } from '@storybook/react'

import Skeleton from './component'

const meta: Meta<typeof Skeleton> = {
  title: 'core/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Base: Story = {}
