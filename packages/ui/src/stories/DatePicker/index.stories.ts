import { Meta, StoryObj } from '@storybook/react'

import DatePicker from './component'

const meta: Meta<typeof DatePicker> = {
  title: 'core/Data Picker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Base: Story = {}
