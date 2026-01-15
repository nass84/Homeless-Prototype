import type { Meta, StoryObj } from "@storybook/react";
import { Details } from "./Details.js";

const meta: Meta<typeof Details> = {
  title: "Components/Details",
  component: Details,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Make a page easier to scan by letting users reveal more detailed information only if they need it.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/details/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    summary: {
      control: "text",
      description: "The summary text that users click to expand",
    },
    children: {
      control: "text",
      description: "The content revealed when expanded",
    },
    open: {
      control: "boolean",
      description: "Whether the details are expanded by default",
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
    summary: "Help with nationality",
    children:
      "We need to know your nationality so we can work out which elections you're entitled to vote in. If you cannot provide your nationality, you'll have to send copies of identity documents through the post.",
  },
};
