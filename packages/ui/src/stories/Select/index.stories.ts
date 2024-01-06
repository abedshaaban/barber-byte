import { Meta, StoryObj } from '@storybook/react'

import Select from './component'

const meta: Meta<typeof Select> = {
  title: 'components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Select>

export const Base: Story = {}
