import type { Meta, StoryObj } from '@storybook/react'

import Footer from '../../../elements/footer'

const meta: Meta<typeof Footer> = {
  title: 'components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
