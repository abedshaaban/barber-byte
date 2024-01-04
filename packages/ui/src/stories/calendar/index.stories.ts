import { Meta, StoryObj } from '@storybook/react'

import Calendar from './component'

const meta: Meta<typeof Calendar> = {
  title: 'components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single']
    }
  }
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Single: Story = {
  args: {
    mode: 'single'
  }
}
