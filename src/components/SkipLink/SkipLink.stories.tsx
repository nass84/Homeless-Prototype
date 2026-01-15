import type { Meta, StoryObj } from "@storybook/react";
import { SkipLink } from "./SkipLink.js";

const meta: Meta<typeof SkipLink> = {
  title: "Components/Skip link",
  component: SkipLink,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the skip link component to help keyboard-only users skip to the main content on a page.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/skip-link/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "The target anchor for the skip link",
    },
    children: {
      control: "text",
      description: "The link text",
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
    href: "#main-content",
    children: "Skip to main content",
  },
};
