import { Meta, StoryObj } from '@storybook/react'

import Input from './component'

const meta: Meta<typeof Input> = {
  title: 'core/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week'
      ]
    }
  }
}

export default meta

type Story = StoryObj<typeof Input>

export const Base: Story = {
  args: {
    type: 'email',
    placeholder: 'Email'
  }
}
