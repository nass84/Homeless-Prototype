import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.js";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup.js";
import { Link } from "../Link/Link.js";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Use the button component to help users carry out an action like starting an application or saving their information.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/button/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button text content",
    },
    variant: {
      control: "radio",
      options: ["default", "start", "secondary", "warning", "inverse"],
      description: "Button style variant",
    },
    href: {
      control: "text",
      description: "If provided, renders as a link with this href",
    },
    type: {
      control: "radio",
      options: ["submit", "button", "reset"],
      description: "Button type (only applies when not using href)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    preventDoubleClick: {
      control: "boolean",
      description: "Prevent accidental double clicks",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
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
    children: "Save and continue",
  },
};

export const Start: Story = {
  args: {
    children: "Start now",
    variant: "start",
    href: "#",
  },
};

export const Secondary: Story = {
  args: {
    children: "Find address",
    variant: "secondary",
  },
};

export const Warning: Story = {
  args: {
    children: "Delete account",
    variant: "warning",
  },
};

export const Inverse: Story = {
  args: {
    children: "Create an account",
    variant: "inverse",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1d70b8" }],
    },
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled button",
    disabled: true,
  },
};

export const GroupWithSecondary: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Save and continue</Button>
      <Button variant="secondary">Save as draft</Button>
    </ButtonGroup>
  ),
};

export const GroupWithLink: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Continue</Button>
      <Link href="#">Cancel</Link>
    </ButtonGroup>
  ),
};
