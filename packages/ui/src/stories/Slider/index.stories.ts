import { Meta, StoryObj } from '@storybook/react'

import Slider from './component'

const meta: Meta<typeof Slider> = {
  title: 'components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Slider>

export const Base: Story = {}
