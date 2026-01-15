import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea.js";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the textarea component when you need to let users enter an amount of text that's longer than a single line.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/textarea/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "The ID for the textarea element",
    },
    name: {
      control: "text",
      description: "The name attribute for the textarea",
    },
    label: {
      control: "text",
      description: "The label text for the textarea",
    },
    labelAsHeading: {
      control: "boolean",
      description: "Whether to wrap the label in an h1 element",
    },
    labelSize: {
      control: "radio",
      options: ["l", "m", "s"],
      description: "The size of the label when used as heading",
    },
    hint: {
      control: "text",
      description: "Hint text to help the user",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    rows: {
      control: "number",
      description: "Number of rows to display",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length",
    },
    spellcheck: {
      control: "boolean",
      description: "Enable or disable spellcheck",
    },
    autocomplete: {
      control: "text",
      description: "Autocomplete attribute value",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the textarea",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "more-detail",
    name: "moreDetail",
    label: "Can you provide more detail?",
    labelAsHeading: true,
    hint: "Do not include personal or financial information, like your National Insurance number or credit card details.",
  },
};

export const SpecifiedRows: Story = {
  args: {
    id: "more-detail-rows",
    name: "moreDetail",
    label: "Can you provide more detail?",
    labelAsHeading: true,
    hint: "Do not include personal or financial information, like your National Insurance number or credit card details.",
    rows: 8,
  },
};

export const WithoutHeading: Story = {
  args: {
    id: "more-detail-no-heading",
    name: "moreDetail",
    label: "Can you provide more detail?",
    labelAsHeading: false,
    hint: "Do not include personal or financial information, like your National Insurance number or credit card details.",
  },
};

export const WithError: Story = {
  args: {
    id: "more-detail-error",
    name: "moreDetail",
    label: "Can you provide more detail?",
    labelAsHeading: true,
    hint: "Do not include personal or financial information, like your National Insurance number or credit card details.",
    error: "Enter more detail",
  },
};
