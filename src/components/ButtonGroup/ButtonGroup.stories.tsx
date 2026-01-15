import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup.js";
import { Button } from "../Button/Button.js";
import { Link } from "../Link/Link.js";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button group",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Use the button group component to group related buttons and links together.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/button/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Buttons and links to display in the group",
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
  render: () => (
    <ButtonGroup>
      <Button>Save and continue</Button>
      <Button variant="secondary">Save as draft</Button>
    </ButtonGroup>
  ),
};

export const WithLink: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Continue</Button>
      <Link href="#">Cancel</Link>
    </ButtonGroup>
  ),
};
