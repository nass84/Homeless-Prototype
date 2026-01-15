import type { Meta, StoryObj } from "@storybook/react";
import { BackLink } from "./BackLink.js";

const meta: Meta<typeof BackLink> = {
  title: "Components/Back link",
  component: BackLink,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the back link component to help users go back to the previous page in a multi-page transaction.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/back-link/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "The URL the back link points to",
    },
    children: {
      control: "text",
      description: 'The link text (defaults to "Back")',
    },
    inverse: {
      control: "boolean",
      description: "Use inverse style for dark backgrounds",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
  },
};

export const Inverse: Story = {
  args: {
    href: "#",
    inverse: true,
  },
  globals: {
    // 👇 Override background value for this story
    backgrounds: { value: "dark" },
  },
};
