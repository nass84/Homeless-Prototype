import type { Meta, StoryObj } from "@storybook/react";
import { PhaseBanner } from "./PhaseBanner.js";
import { Link } from "../Link/Link.js";

const meta: Meta<typeof PhaseBanner> = {
  title: "Components/Phase banner",
  component: PhaseBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the phase banner component to show users your service is still being worked on.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/phase-banner/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tag: {
      control: "text",
      description: "The phase tag text (e.g. 'alpha', 'beta')",
    },
    children: {
      description: "The banner content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Alpha: Story = {
  args: {
    tag: "alpha",
    children: (
      <>
        This is a new service. Help us improve it and{" "}
        <Link href="mailto:feedback@example.com">give your feedback by email</Link>.
      </>
    ),
  },
};

export const Beta: Story = {
  args: {
    tag: "beta",
    children: (
      <>
        This is a new service – your{" "}
        <Link href="#" target="_blank">
          feedback (opens in new tab)
        </Link>{" "}
        will help us to improve it.
      </>
    ),
  },
};
