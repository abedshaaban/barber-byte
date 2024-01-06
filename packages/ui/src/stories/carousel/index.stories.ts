import { Meta, StoryObj } from '@storybook/react'

import Carousel from './component'

const meta: Meta<typeof Carousel> = {
  title: 'core/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  }
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    loop: false
  }
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    loop: false
  }
}

export const Loop: Story = {
  args: { orientation: 'horizontal', loop: true }
}

export const NOLoop: Story = {
  args: { orientation: 'horizontal', loop: false }
}
