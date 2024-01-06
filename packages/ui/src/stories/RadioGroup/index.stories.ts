import { Meta, StoryObj } from '@storybook/react'

import RadioGroup from './component'

const meta: Meta<typeof RadioGroup> = {
  title: 'core/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Base: Story = {}
