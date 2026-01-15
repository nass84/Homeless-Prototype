import type { Meta, StoryObj } from "@storybook/react";
import { CookieBanner } from "./CookieBanner.js";
import { Link } from "../Link/Link.js";

const meta: Meta<typeof CookieBanner> = {
  title: "Components/Cookie banner",
  component: CookieBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Allow users to accept or reject cookies which are not essential to making your service work.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/cookie-banner/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    serviceName: {
      control: "text",
      description: "Name of the service for the aria-label",
    },
    messages: {
      control: "object",
      description: "Array of messages to display in the banner",
    },
    ariaLabel: {
      control: "text",
      description: "Custom aria-label for the banner",
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
    serviceName: "[name of service]",
    messages: [
      {
        heading: "Cookies on [name of service]",
        content: (
          <>
            We use some essential cookies to make this service work.
            <br />
            <br />
            We'd also like to use analytics cookies so we can understand how you
            use the service and make improvements.
          </>
        ),
        actions: [
          { text: "Accept analytics cookies", type: "button" },
          { text: "Reject analytics cookies", type: "button" },
          { text: "View cookies", type: "link", href: "#" },
        ],
      },
    ],
  },
};

export const AcceptedConfirmation: Story = {
  args: {
    serviceName: "[name of service]",
    messages: [
      {
        content: (
          <>
            You've accepted analytics cookies. You can{" "}
            <Link href="#">change your cookie settings</Link> at any time.
          </>
        ),
        actions: [{ text: "Hide cookie message", type: "button" }],
        role: "alert",
      },
    ],
  },
};

export const RejectedConfirmation: Story = {
  args: {
    serviceName: "[name of service]",
    messages: [
      {
        content: (
          <>
            You've rejected analytics cookies. You can{" "}
            <Link href="#">change your cookie settings</Link> at any time.
          </>
        ),
        actions: [{ text: "Hide cookie message", type: "button" }],
        role: "alert",
      },
    ],
  },
};

export const ClientSideWithAllMessages: Story = {
  args: {
    serviceName: "[name of service]",
    messages: [
      {
        heading: "Cookies on [name of service]",
        content: (
          <>
            We use some essential cookies to make this service work.
            <br />
            <br />
            We'd also like to use analytics cookies so we can understand how you
            use the service and make improvements.
          </>
        ),
        actions: [
          { text: "Accept analytics cookies", type: "button" },
          { text: "Reject analytics cookies", type: "button" },
          { text: "View cookies", type: "link", href: "#" },
        ],
      },
      {
        content: (
          <>
            You've accepted analytics cookies. You can{" "}
            <Link href="#">change your cookie settings</Link> at any time.
          </>
        ),
        actions: [{ text: "Hide cookie message", type: "button" }],
        role: "alert",
        hidden: true,
      },
      {
        content: (
          <>
            You've rejected analytics cookies. You can{" "}
            <Link href="#">change your cookie settings</Link> at any time.
          </>
        ),
        actions: [{ text: "Hide cookie message", type: "button" }],
        role: "alert",
        hidden: true,
      },
    ],
  },
};
