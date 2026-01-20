import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "./Paragraph.js";

const meta: Meta<typeof Paragraph> = {
  title: "Typography/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `The default paragraph font size is 19px on large screens and 16px on small screens.

[Read more about how to use paragraphs on the GOV.UK Design System](https://design-system.service.gov.uk/styles/paragraphs/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["l", "m", "s"],
      description: "The paragraph size (l = lead, m = body, s = small)",
    },
    children: {
      control: "text",
      description: "The paragraph content",
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
      "A paragraph is a self-contained unit of a discourse in writing dealing with a particular point or idea. Paragraphs are usually an expected part of formal writing, used to organize longer prose.",
  },
};

export const Lead: Story = {
  args: {
    size: "l",
    children:
      "A lead paragraph is an opening paragraph that summarises the main point of a page. You should only use it once per page if needed.",
  },
};

export const Small: Story = {
  args: {
    size: "s",
    children:
      "Use small body text sparingly. The majority of your body copy should use the standard 19px paragraph size.",
  },
};
