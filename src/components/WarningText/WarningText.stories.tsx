import type { Meta, StoryObj } from "@storybook/react";
import { WarningText } from "./WarningText.js";

const meta: Meta<typeof WarningText> = {
  title: "Components/Warning text",
  component: WarningText,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/warning-text/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The warning message content",
    },
    iconFallbackText: {
      control: "text",
      description: "Fallback text for the warning icon (for screen readers)",
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
    children: "You can be fined up to £5,000 if you do not register.",
  },
};
