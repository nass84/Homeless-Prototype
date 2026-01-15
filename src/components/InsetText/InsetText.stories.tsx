import type { Meta, StoryObj } from "@storybook/react";
import { InsetText } from "./InsetText.js";

const meta: Meta<typeof InsetText> = {
  title: "Components/Inset text",
  component: InsetText,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the inset text component to differentiate a block of text from the content that surrounds it.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/inset-text/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content to display inside the inset text",
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
    children:
      "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
  },
};
