import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link.js";
import { GDSReactProvider } from "../GDSReactProvider/GDSReactProvider.js";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Links are blue and underlined by default. If your link is at the end of a sentence or paragraph, make sure that the linked text does not include the full stop.

[Read more about how to use links on the GOV.UK Design System](https://design-system.service.gov.uk/styles/links/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "URL to navigate to",
    },
    children: {
      control: "text",
      description: "Link text content",
    },
    noVisitedState: {
      control: "boolean",
      description: "Remove visited state styling",
    },
    inverse: {
      control: "boolean",
      description: "Use inverse styling (for dark backgrounds)",
    },
    noUnderline: {
      control: "boolean",
      description: "Remove underline from link",
    },
    opensInNewTab: {
      control: "boolean",
      description: "Open link in new tab/window",
    },
    external: {
      control: "boolean",
      description: "Mark as external link with icon",
    },
    hreflang: {
      control: "text",
      description: "Language of the linked resource",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <GDSReactProvider>
        <Story />
      </GDSReactProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "This is a link",
  },
};

export const NoVisitedState: Story = {
  args: {
    href: "#",
    children: "Link with no visited state",
    noVisitedState: true,
  },
};

export const OpensInNewTab: Story = {
  args: {
    href: "https://www.gov.uk",
    children: "Read more about the GOV.UK Design System (opens in new tab)",
    opensInNewTab: true,
  },
};

export const Inverse: Story = {
  args: {
    href: "#",
    children: "Inverse link for dark backgrounds",
    inverse: true,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const NoUnderline: Story = {
  args: {
    href: "#",
    children: "Link without underline",
    noUnderline: true,
  },
};

export const LanguageSwitching: Story = {
  render: () => (
    <ul className="govuk-list">
      <li>
        <Link href="#" hreflang="en">
          English
        </Link>
      </li>
      <li>
        <Link href="#" hreflang="cy">
          Cymraeg (Welsh)
        </Link>
      </li>
    </ul>
  ),
};

// Custom link component stories - demonstrating GDSReactProvider integration

const MockRouterLink = ({
  href,
  children,
  ...props
}: React.ComponentProps<"a">) => (
  <a
    {...props}
    href={href}
    style={{ outline: "2px dashed hotpink", outlineOffset: "2px" }}
    onClick={(e) => {
      e.preventDefault();
      console.log("[MockRouter] Navigating to:", href);
      props.onClick?.(e);
    }}
  >
    {children}
  </a>
);

export const WithCustomRouter: Story = {
  args: {
    href: "/dashboard",
    children: "Go to dashboard (custom router)",
  },
  decorators: [
    (Story) => (
      <GDSReactProvider linkComponent={MockRouterLink}>
        <Story />
      </GDSReactProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using a custom link component via `GDSReactProvider`. The pink dashed outline indicates the custom router is being used.",
      },
    },
  },
};

const MockNextLink = ({
  href,
  children,
  ...props
}: React.ComponentProps<"a">) => {
  const shouldPrefetch = !href?.includes("logout");

  return (
    <a
      {...props}
      href={href}
      data-prefetch={shouldPrefetch}
      style={{
        outline: `2px dashed ${shouldPrefetch ? "limegreen" : "orange"}`,
        outlineOffset: "2px",
      }}
      onClick={(e) => {
        e.preventDefault();
        console.log(
          "[MockNextLink] Navigating to:",
          href,
          "| Prefetch:",
          shouldPrefetch
        );
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
};

export const WithPrefetchControl: Story = {
  args: {
    href: "/logout",
    children: "Logout (prefetch disabled)",
  },
  decorators: [
    (Story) => (
      <GDSReactProvider linkComponent={MockNextLink}>
        <Story />
      </GDSReactProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates conditional prefetch control for Next.js-style routers. Orange outline = prefetch disabled (e.g. logout links), green = prefetch enabled.",
      },
    },
  },
};

export const PrefetchEnabled: Story = {
  args: {
    href: "/settings",
    children: "Settings (prefetch enabled)",
  },
  decorators: [
    (Story) => (
      <GDSReactProvider linkComponent={MockNextLink}>
        <Story />
      </GDSReactProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "A normal route with prefetch enabled (green outline).",
      },
    },
  },
};
