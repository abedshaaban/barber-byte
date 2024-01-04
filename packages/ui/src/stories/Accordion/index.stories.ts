import { Meta, StoryObj } from '@storybook/react'

import Accordion from './component'

const meta: Meta<typeof Accordion> = {
  title: 'components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple']
    }
  }
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Base: Story = {
  args: {
    type: 'single',
    collapsible: true
  }
}
