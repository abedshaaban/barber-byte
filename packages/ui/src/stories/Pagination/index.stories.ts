import { Meta, StoryObj } from '@storybook/react'

import Pagination from './component'

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Base: Story = {}
