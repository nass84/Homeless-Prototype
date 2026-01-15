import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBanner } from "./NotificationBanner.js";
import { Link } from "../Link/Link.js";

const meta: Meta<typeof NotificationBanner> = {
  title: "Components/Notification banner",
  component: NotificationBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use a notification banner to tell the user about something they need to know about, but that's not directly related to the page content.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/notification-banner/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title of the banner (defaults based on type)",
    },
    type: {
      control: "radio",
      options: ["neutral", "success"],
      description: "The type of banner",
    },
    heading: {
      control: "text",
      description: "The main heading content",
    },
    children: {
      description: "Additional content below the heading",
    },
    titleId: {
      control: "text",
      description: "ID for the title element",
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
    heading: (
      <>
        You have 7 days left to send your application.{" "}
        <Link href="#">View application</Link>.
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    type: "success",
    heading: "Training outcome recorded and trainee withdrawn",
    children: (
      <p className="govuk-body">
        Contact <Link href="mailto:example@department.gov.uk">example@department.gov.uk</Link> if you think there's a problem.
      </p>
    ),
  },
};
