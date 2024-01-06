import { Meta, StoryObj } from '@storybook/react'

import ScrollArea from './component'

const meta: Meta<typeof ScrollArea> = {
  title: 'components/Scroll Area',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof ScrollArea>

export const Base: Story = {}
