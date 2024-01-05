import { Meta, StoryObj } from '@storybook/react'

import Checkbox from './component'

const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {}
