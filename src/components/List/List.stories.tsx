import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List.js";
import { Link } from "../Link/Link.js";

const meta: Meta<typeof List> = {
  title: "Typography/List",
  component: List,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use lists to make blocks of text easier to read, and to break information into manageable chunks.

[Read more about how to use lists on the GOV.UK Design System](https://design-system.service.gov.uk/styles/lists/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["plain", "bullet", "number"],
      description: "The list type",
    },
    spaced: {
      control: "boolean",
      description: "Add extra spacing between items",
    },
    items: {
      description: "Array of list items",
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
    items: [
      <Link href="#">Benefits calculators</Link>,
      <Link href="#">Benefit overpayments</Link>,
      <Link href="#">Benefit fraud</Link>,
      <Link href="#">More about benefits</Link>,
    ],
  },
};

export const Bulleted: Story = {
  args: {
    type: "bullet",
    items: [
      "apple",
      "orange",
      "pear",
    ],
  },
};

export const Numbered: Story = {
  args: {
    type: "number",
    items: [
      "Delivery address.",
      "Payment.",
      "Confirmation.",
    ],
  },
};

export const BulletedSpaced: Story = {
  args: {
    type: "bullet",
    spaced: true,
    items: [
      "constructing, altering or extending a building or structure (a deck, deck roof, fence, retaining wall, or external wall)",
      "changing or partially demolishing the layout, structure or linings of a building",
      "changing the purpose for which a building is used",
    ],
  },
};

export const NumberedSpaced: Story = {
  args: {
    type: "number",
    spaced: true,
    items: [
      "Log in to the Online Service Centre.",
      "Navigate to 'My Applications' section from the main menu.",
      "Select the application you want to review and click 'View Details'.",
    ],
  },
};
