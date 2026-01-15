import type { Meta, StoryObj } from "@storybook/react";
import { PageTemplate } from "./PageTemplate.js";
import { Link } from "../Link/Link.js";
import { Paragraph } from "../Paragraph/Paragraph.js";

const meta: Meta<typeof PageTemplate> = {
  title: "Page Structure/Page Template",
  component: PageTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `The page template combines the GOV.UK header, footer, and optional navigation components to create a consistent page structure for your service.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    serviceName: {
      control: "text",
      description: "The name of the service",
    },
    serviceUrl: {
      control: "text",
      description: "The URL for the service name link",
    },
    navigationItems: {
      description: "Array of navigation items (uses ServiceNavigation when provided)",
    },
    phase: {
      control: "radio",
      options: ["alpha", "beta"],
      description: "The phase banner type",
    },
    phaseContent: {
      description: "Content for the phase banner",
    },
    backLink: {
      description: "Back link configuration",
    },
    title: {
      control: "text",
      description: "The page title (h1)",
    },
    children: {
      description: "Page content",
    },
    footer: {
      description: "Footer configuration",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default page template",
  },
};

export const WithServiceName: Story = {
  args: {
    serviceName: "Service name",
    title: "Page with service name",
    children: (
      <Paragraph>
        This page template includes a service name in the header.
      </Paragraph>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    serviceName: "Service name",
    navigationItems: [
      { text: "Navigation item 1", href: "#", active: true },
      { text: "Navigation item 2", href: "#" },
      { text: "Navigation item 3", href: "#" },
    ],
    title: "Page with navigation",
    children: (
      <Paragraph>
        When navigation items are provided, the service navigation component is
        used instead of just the header with a service name.
      </Paragraph>
    ),
  },
};

export const WithPhaseBanner: Story = {
  args: {
    serviceName: "Service name",
    phase: "alpha",
    phaseContent: (
      <>
        This is a new service – your{" "}
        <Link href="#">feedback</Link> will help us to improve it.
      </>
    ),
    title: "Page with phase banner",
    children: (
      <Paragraph>
        This page includes an alpha phase banner to indicate the service is
        still in development.
      </Paragraph>
    ),
  },
};

export const WithBackLink: Story = {
  args: {
    serviceName: "Service name",
    backLink: {
      href: "#",
    },
    title: "Page with back link",
    children: (
      <Paragraph>
        This page includes a back link for navigation.
      </Paragraph>
    ),
  },
};

export const WithFooterMeta: Story = {
  args: {
    serviceName: "Service name",
    title: "Page with footer links",
    children: (
      <Paragraph>
        This page includes additional links in the footer.
      </Paragraph>
    ),
    footer: {
      meta: {
        visuallyHiddenTitle: "Support links",
        items: [
          { text: "Help", href: "#" },
          { text: "Cookies", href: "#" },
          { text: "Contact", href: "#" },
          { text: "Terms and conditions", href: "#" },
        ],
      },
    },
  },
};

export const FullExample: Story = {
  args: {
    serviceName: "Service name",
    navigationItems: [
      { text: "Navigation item 1", href: "#", active: true },
      { text: "Navigation item 2", href: "#" },
      { text: "Navigation item 3", href: "#" },
    ],
    cookieBanner: {
      messages: [
        {
          heading: "Cookies on Service name",
          content: (
            <>
              We use some essential cookies to make this service work.
              <br />
              <br />
              We'd also like to use analytics cookies so we can understand how
              you use the service and make improvements.
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
    phase: "beta",
    phaseContent: (
      <>
        This is a new service – your{" "}
        <Link href="#">feedback</Link> will help us to improve it.
      </>
    ),
    backLink: {
      href: "#",
    },
    title: "Customised page template",
    children: (
      <>
        <Paragraph>
          This example shows a fully customised page template with all available
          options configured.
        </Paragraph>
        <Paragraph>
          It includes a cookie banner, service name, navigation items, a beta
          phase banner, a back link, and footer meta links.
        </Paragraph>
      </>
    ),
    footer: {
      meta: {
        visuallyHiddenTitle: "Support links",
        items: [
          { text: "Help", href: "#" },
          { text: "Cookies", href: "#" },
          { text: "Contact", href: "#" },
          { text: "Terms and conditions", href: "#" },
        ],
      },
    },
  },
};
