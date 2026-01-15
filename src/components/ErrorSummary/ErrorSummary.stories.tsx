import type { Meta, StoryObj } from "@storybook/react";
import { ErrorSummary } from "./ErrorSummary.js";

const meta: Meta<typeof ErrorSummary> = {
  title: "Components/Error summary",
  component: ErrorSummary,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use this component at the top of a page to summarise any errors a user has made.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/error-summary/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The heading text for the error summary",
    },
    errors: {
      control: "object",
      description: "Array of errors with target element ID and message",
    },
    hideOnEmpty: {
      control: "boolean",
      description: "Whether to hide the component when there are no errors",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errors: [
      { target: "full-name", message: "Enter your full name" },
      {
        target: "passport-issued-day",
        message: "The date your passport was issued must be in the past",
      },
    ],
  },
};
