import { Meta, StoryObj } from '@storybook/react'

import Table from './component'

const meta: Meta<typeof Table> = {
  title: 'core/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Table>

export const Base: Story = {}
