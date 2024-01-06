import { Meta, StoryObj } from '@storybook/react'

import Sheet from './component'

const meta: Meta<typeof Sheet> = {
  title: 'components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    }
  }
}

export default meta

type Story = StoryObj<typeof Sheet>

export const Base: Story = {
  args: {
    side: 'right'
  }
}
