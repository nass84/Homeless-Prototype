import type { Meta, StoryObj } from "@storybook/react";
import { ExitThisPage } from "./ExitThisPage.js";
import { Paragraph } from "../Paragraph/Paragraph.js";

const meta: Meta<typeof ExitThisPage> = {
  title: "Components/Exit this page",
  component: ExitThisPage,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Give users a way to quickly and safely exit a service, website or application.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/exit-this-page/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "The URL to redirect to when activated",
    },
    text: {
      control: "text",
      description: "The visible text",
    },
    emergencyText: {
      control: "text",
      description:
        "Visually hidden text prepended for screen readers (button variant only)",
    },
    variant: {
      control: "radio",
      options: ["button", "skipLink"],
      description: "The variant to render",
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
    href: "https://www.bbc.co.uk/weather",
  },
};

export const SkipLink: Story = {
  args: {
    href: "https://www.bbc.co.uk/weather",
    variant: "skipLink",
  },
  render: (args) => (
    <>
      <Paragraph>
        To view the secondary link, tab to or click inside this example and then
        press tab.
      </Paragraph>
      <ExitThisPage {...args} />
    </>
  ),
};
