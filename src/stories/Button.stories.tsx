import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@chakra-ui/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    colorScheme: 'blue',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'outline',
    colorScheme: 'blue',
  },
};