import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading.js";

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use heading tags like h1, h2 and so on, to structure your content. Write all headings in sentence case.

[Read more about how to use headings on the GOV.UK Design System](https://design-system.service.gov.uk/styles/headings/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
      description: "The heading level (h1-h6)",
    },
    size: {
      control: "radio",
      options: ["xl", "l", "m", "s"],
      description: "The visual size of the heading",
    },
    caption: {
      control: "text",
      description: "Caption text above or inside the heading",
    },
    captionInside: {
      control: "boolean",
      description: "Whether to render the caption inside the heading element",
    },
    children: {
      control: "text",
      description: "The heading text",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraLarge: Story = {
  args: {
    level: 1,
    size: "xl",
    children: "govuk-heading-xl",
  },
};

export const Large: Story = {
  args: {
    level: 2,
    size: "l",
    children: "govuk-heading-l",
  },
};

export const Medium: Story = {
  args: {
    level: 3,
    size: "m",
    children: "govuk-heading-m",
  },
};

export const Small: Story = {
  args: {
    level: 4,
    size: "s",
    children: "govuk-heading-s",
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <Heading level={1} size="xl">
        govuk-heading-xl
      </Heading>
      <Heading level={2} size="l">
        govuk-heading-l
      </Heading>
      <Heading level={3} size="m">
        govuk-heading-m
      </Heading>
      <Heading level={4} size="s">
        govuk-heading-s
      </Heading>
    </>
  ),
};

export const WithCaption: Story = {
  args: {
    level: 1,
    size: "xl",
    caption: "Service name",
    children: "Page heading",
  },
};

export const WithCaptionInside: Story = {
  args: {
    level: 1,
    size: "xl",
    caption: "Service name",
    captionInside: true,
    children: "Page heading",
  },
};
