import { Meta, StoryObj } from '@storybook/react'

import Combobox from './component'

const meta: Meta<typeof Combobox> = {
  title: 'components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Combobox>

export const Base: Story = {}
