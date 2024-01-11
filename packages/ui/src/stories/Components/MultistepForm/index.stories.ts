import type { Meta, StoryObj } from '@storybook/react'

import MultistepForm from './component'

const meta: Meta<typeof MultistepForm> = {
  title: 'components/MultistepForm',
  component: MultistepForm,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
