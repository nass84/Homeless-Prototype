import type { Meta, StoryObj } from "@storybook/react";
import { ServiceNavigation } from "./ServiceNavigation.js";
import { Header } from "../Header/Header.js";

const meta: Meta<typeof ServiceNavigation> = {
  title: "Components/Service navigation",
  component: ServiceNavigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `The service navigation helps users understand that they're using your service and lets them navigate around your service.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/service-navigation/)`,
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
      description: "Array of navigation items",
    },
    navigationLabel: {
      control: "text",
      description: "Aria label for the navigation",
    },
    toggleLabel: {
      control: "text",
      description: "Label for the mobile menu toggle button",
    },
    ariaLabel: {
      control: "text",
      description: "Aria label for the service section",
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
    navigationItems: [
      { text: "Navigation item 1", href: "#", active: true },
      { text: "Navigation item 2", href: "#" },
      { text: "Navigation item 3", href: "#" },
      { text: "Navigation item 4", href: "#" },
    ],
  },
};

export const WithHeader: Story = {
  render: (args) => (
    <>
      <Header fullWidthBorder />
      <ServiceNavigation {...args} />
    </>
  ),
  args: {
    navigationItems: [
      { text: "Navigation item 1", href: "#", active: true },
      { text: "Navigation item 2", href: "#" },
      { text: "Navigation item 3", href: "#" },
      { text: "Navigation item 4", href: "#" },
    ],
  },
};

export const ServiceNameOnly: Story = {
  args: {
    serviceName: "Service name",
    serviceUrl: "#",
  },
};

export const ServiceNameAndNavigation: Story = {
  args: {
    serviceName: "Service name",
    serviceUrl: "#",
    navigationItems: [
      { text: "Navigation item 1", href: "#", active: true },
      { text: "Navigation item 2", href: "#" },
      { text: "Navigation item 3", href: "#" },
      { text: "Navigation item 4", href: "#" },
    ],
  },
};
