import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput.js";

const meta: Meta<typeof TextInput> = {
  title: "Components/Text input",
  component: TextInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the text input component when you need to let users enter text that's no longer than a single line.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/text-input/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "The ID for the input element",
    },
    name: {
      control: "text",
      description: "The name attribute for the input",
    },
    label: {
      control: "text",
      description: "The label text for the input",
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
    type: {
      control: "select",
      options: ["text", "email", "tel", "url", "search"],
      description: "The input type",
    },
    inputMode: {
      control: "select",
      options: ["numeric", "decimal", "tel", "email", "url", "search"],
      description: "The input mode for virtual keyboards",
    },
    width: {
      control: "select",
      options: [
        2,
        3,
        4,
        5,
        10,
        20,
        "full",
        "three-quarters",
        "two-thirds",
        "one-half",
        "one-third",
        "one-quarter",
      ],
      description: "The width of the input",
    },
    prefix: {
      control: "text",
      description: "Prefix text or symbol",
    },
    suffix: {
      control: "text",
      description: "Suffix text or symbol",
    },
    extraLetterSpacing: {
      control: "boolean",
      description: "Add extra letter spacing for codes",
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
      description: "Additional CSS classes for the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "event-name",
    name: "eventName",
    label: "What is the name of the event?",
    labelAsHeading: true,
  },
};

export const WithoutHeading: Story = {
  args: {
    id: "event-name-no-heading",
    name: "eventName",
    label: "What is the name of the event?",
    labelAsHeading: false,
  },
};

export const WithHint: Story = {
  args: {
    id: "ni-number",
    name: "niNumber",
    label: "What is your National Insurance number?",
    labelAsHeading: true,
    hint: "It's on your National Insurance card, benefit letter, payslip or P60. For example, 'QQ 12 34 56 C'.",
  },
};

export const FixedWidth: Story = {
  args: {
    id: "width-10",
    name: "width10",
    label: "What is your National Insurance number?",
    labelAsHeading: true,
    hint: "It's on your National Insurance card, benefit letter, payslip or P60. For example, 'QQ 12 34 56 C'.",
    width: 10,
  },
};

export const FluidWidths: Story = {
  render: () => (
    <>
      <TextInput id="full" name="full" label="Full width" width="full" />
      <TextInput
        id="three-quarters"
        name="threeQuarters"
        label="Three-quarters width"
        width="three-quarters"
      />
      <TextInput
        id="two-thirds"
        name="twoThirds"
        label="Two-thirds width"
        width="two-thirds"
      />
      <TextInput
        id="one-half"
        name="oneHalf"
        label="One-half width"
        width="one-half"
      />
      <TextInput
        id="one-third"
        name="oneThird"
        label="One-third width"
        width="one-third"
      />
      <TextInput
        id="one-quarter"
        name="oneQuarter"
        label="One-quarter width"
        width="one-quarter"
      />
    </>
  ),
};

export const NumericInput: Story = {
  args: {
    id: "account-number",
    name: "accountNumber",
    label: "What is your account number?",
    labelAsHeading: true,
    hint: "Must be between 6 and 8 digits long",
    width: 10,
    inputMode: "numeric",
    spellcheck: false,
  },
};

export const CodesAndSequences: Story = {
  args: {
    id: "authentication-code",
    name: "authenticationCode",
    label: "Company authentication code",
    hint: "This is on the company incorporation letter sent to the registered office address",
    width: 5,
    extraLetterSpacing: true,
    spellcheck: false,
    defaultValue: "NC1701",
  },
};

export const WithPrefix: Story = {
  args: {
    id: "cost",
    name: "cost",
    label: "What is the cost in pounds?",
    labelAsHeading: true,
    prefix: "£",
    width: 5,
    inputMode: "numeric",
  },
};

export const WithSuffix: Story = {
  args: {
    id: "weight",
    name: "weight",
    label: "What is the weight in kilograms?",
    labelAsHeading: true,
    suffix: "kg",
    width: 5,
    inputMode: "numeric",
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    id: "cost-per-item",
    name: "costPerItem",
    label: "What is the cost per item?",
    labelAsHeading: true,
    prefix: "£",
    suffix: "per item",
    width: 5,
    inputMode: "numeric",
  },
};

export const WithAutocomplete: Story = {
  args: {
    id: "postcode",
    name: "postcode",
    label: "What is your postcode?",
    labelAsHeading: true,
    width: 10,
    autocomplete: "postal-code",
  },
};

export const WithError: Story = {
  args: {
    id: "event-name-error",
    name: "eventName",
    label: "What is the name of the event?",
    labelAsHeading: true,
    error: "Enter an event name",
  },
};

export const WithErrorAndPrefix: Story = {
  args: {
    id: "cost-error",
    name: "cost",
    label: "What is the cost in pounds?",
    labelAsHeading: true,
    prefix: "£",
    width: 5,
    inputMode: "numeric",
    error: "Enter a cost",
  },
};
