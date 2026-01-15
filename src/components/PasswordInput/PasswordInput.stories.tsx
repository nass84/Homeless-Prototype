import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput.js";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/Password input",
  component: PasswordInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Help users to create and enter passwords.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/password-input/)`,
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
    autocomplete: {
      control: "radio",
      options: ["current-password", "new-password"],
      description: "The autocomplete attribute value",
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
    id: "password",
    name: "password",
    label: "Create a password",
  },
};

export const WithError: Story = {
  args: {
    id: "password-with-error",
    name: "password",
    label: "Create a password",
    error: "Enter a password",
  },
};
