import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag.js";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the tag component to show users the status of something.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/tag/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The tag text",
    },
    colour: {
      control: "select",
      options: [
        "grey",
        "green",
        "turquoise",
        "blue",
        "light-blue",
        "purple",
        "pink",
        "red",
        "orange",
        "yellow",
      ],
      description: "The tag colour",
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
    children: "Completed",
    colour: "blue",
  },
};

export const Grey: Story = {
  args: {
    children: "Inactive",
    colour: "grey",
  },
};

export const Green: Story = {
  args: {
    children: "New",
    colour: "green",
  },
};

export const Turquoise: Story = {
  args: {
    children: "Active",
    colour: "turquoise",
  },
};

export const Blue: Story = {
  args: {
    children: "Pending",
    colour: "blue",
  },
};

export const LightBlue: Story = {
  args: {
    children: "In progress",
    colour: "light-blue",
  },
};

export const Purple: Story = {
  args: {
    children: "Received",
    colour: "purple",
  },
};

export const Pink: Story = {
  args: {
    children: "Sent",
    colour: "pink",
  },
};

export const Red: Story = {
  args: {
    children: "Rejected",
    colour: "red",
  },
};

export const Orange: Story = {
  args: {
    children: "Declined",
    colour: "orange",
  },
};

export const Yellow: Story = {
  args: {
    children: "Delayed",
    colour: "yellow",
  },
};
