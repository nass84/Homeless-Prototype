import type { Meta, StoryObj } from "@storybook/react";
import { CharacterCount } from "./CharacterCount.js";

const meta: Meta<typeof CharacterCount> = {
  title: "Components/Character count",
  component: CharacterCount,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Help users know how much text they can enter when there is a limit on the number of characters.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/character-count/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the textarea",
    },
    name: {
      control: "text",
      description: "Name attribute for the textarea",
    },
    label: {
      control: "text",
      description: "Label text for the textarea",
    },
    labelAsHeading: {
      control: "boolean",
      description: "Whether to render the label as a page heading",
    },
    labelSize: {
      control: "radio",
      options: ["l", "m", "s"],
      description: "Size of the label",
    },
    hint: {
      control: "text",
      description: "Hint text to help users",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    maxLength: {
      control: "number",
      description: "Maximum number of characters allowed",
    },
    maxWords: {
      control: "number",
      description: "Maximum number of words allowed",
    },
    threshold: {
      control: "number",
      description: "Percentage at which to show the count message",
    },
    rows: {
      control: "number",
      description: "Number of rows for the textarea",
    },
    defaultValue: {
      control: "text",
      description: "Default value for the textarea",
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
    id: "more-detail",
    name: "moreDetail",
    label: "Can you provide more detail?",
    labelAsHeading: true,
    hint: "Do not include personal or financial information like your National Insurance number or credit card details.",
    maxLength: 200,
  },
};

export const WithoutHeading: Story = {
  args: {
    id: "event-description",
    name: "eventDescription",
    label: "Describe the nature of your event",
    maxLength: 200,
  },
};

export const WordCount: Story = {
  args: {
    id: "job-description",
    name: "jobDescription",
    label: "Enter a job description",
    labelAsHeading: true,
    maxWords: 150,
  },
};

export const WithThreshold: Story = {
  args: {
    id: "more-detail-threshold",
    name: "moreDetailThreshold",
    label: "Can you provide more detail?",
    labelAsHeading: true,
    maxLength: 1000,
    threshold: 85,
    defaultValue:
      `This example of a textarea has a character limit of 1000 characters. The character count is hidden, but will appear when more than 850 characters are entered in this textarea. Type some more text into this textarea to see the character count appear. This paragraph will now repeat 2 more times.

This example of a textarea has a character limit of 1000 characters. The character count is hidden, but will appear when more than 850 characters are entered in this textarea. Type some more text into this textarea to see the character count appear. This paragraph will now repeat 1 more time.

This example of a textarea has a character limit of 1000 characters. The character count is hidden, but will appear when more than 850 characters are entered in this textarea. Type some more text into this textarea to see the character count appear.`,
  },
};

export const WithError: Story = {
  args: {
    id: "job-description-error",
    name: "jobDescriptionError",
    label: "Enter a job description",
    labelAsHeading: true,
    maxLength: 350,
    error: "Job description must be 350 characters or less",
    defaultValue:
      `A content designer works on the end-to-end journey of a service to help users complete their goal and government deliver a policy intent. Their work may involve the creation of, or change to, a transaction, product or single piece of content that stretches across digital and offline channels. They make sure appropriate content is shown to a user in the right place and in the best format.`
  },
};
