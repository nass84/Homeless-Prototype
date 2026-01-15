import type { Meta, StoryObj } from "@storybook/react";
import { SummaryList } from "./SummaryList.js";

const meta: Meta<typeof SummaryList> = {
  title: "Components/Summary list",
  component: SummaryList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the summary list to summarise information, for example, a user's responses at the end of a form.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/summary-list/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    rows: {
      description: "Array of key-value rows",
    },
    noBorder: {
      control: "boolean",
      description: "Remove borders from the summary list",
    },
    card: {
      description: "Wrap the summary list in a card with a title",
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
    rows: [
      {
        key: "Name",
        value: "Sarah Philips",
        actions: [{ href: "#", text: "Change", visuallyHiddenText: "name" }],
      },
      {
        key: "Date of birth",
        value: "5 January 1978",
        actions: [
          { href: "#", text: "Change", visuallyHiddenText: "date of birth" },
        ],
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
        actions: [{ href: "#", text: "Change", visuallyHiddenText: "address" }],
      },
      {
        key: "Contact details",
        value: (
          <>
            07700 900457
            <br />
            sarah.phillips@example.com
          </>
        ),
        actions: [
          { href: "#", text: "Change", visuallyHiddenText: "contact details" },
        ],
      },
    ],
  },
};

export const WithoutActions: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Sarah Philips",
      },
      {
        key: "Date of birth",
        value: "5 January 1978",
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
      },
      {
        key: "Contact details",
        value: (
          <>
            07700 900457
            <br />
            sarah.phillips@example.com
          </>
        ),
      },
    ],
  },
};

export const MixedActions: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Sarah Philips",
        actions: [{ href: "#", text: "Change", visuallyHiddenText: "name" }],
      },
      {
        key: "Date of birth",
        value: "5 January 1978",
        actions: [
          { href: "#", text: "Change", visuallyHiddenText: "date of birth" },
        ],
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
        actions: [{ href: "#", text: "Change", visuallyHiddenText: "address" }],
      },
      {
        key: "Contact details",
        value: (
          <>
            07700 900457
            <br />
            sarah.phillips@example.com
          </>
        ),
      },
    ],
  },
};

export const WithoutBorders: Story = {
  args: {
    noBorder: true,
    rows: [
      {
        key: "Name",
        value: "Sarah Philips",
      },
      {
        key: "Date of birth",
        value: "5 January 1978",
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
      },
      {
        key: "Contact details",
        value: (
          <>
            07700 900457
            <br />
            sarah.phillips@example.com
          </>
        ),
      },
    ],
  },
};

export const WithMissingInformation: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Sarah Philips",
        actions: [{ href: "#", text: "Change", visuallyHiddenText: "name" }],
      },
      {
        key: "Date of birth",
        value: "5 January 1978",
        actions: [
          { href: "#", text: "Change", visuallyHiddenText: "date of birth" },
        ],
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
        actions: [{ href: "#", text: "Change", visuallyHiddenText: "address" }],
      },
      {
        key: "Contact details",
        value: <span className="govuk-hint">No contact details provided</span>,
        actions: [
          { href: "#", text: "Enter", visuallyHiddenText: "contact details" },
        ],
      },
    ],
  },
};

export const SummaryCard: Story = {
  args: {
    card: {
      title: "Lead tenant",
    },
    rows: [
      {
        key: "Age",
        value: "38",
      },
      {
        key: "Nationality",
        value: "UK national resident in UK",
      },
      {
        key: "Working situation",
        value: "Part time – Loss of hours",
      },
    ],
  },
};

export const SummaryCardWithActions: Story = {
  args: {
    card: {
      title: "Lead tenant",
      actions: [
        { href: "#", text: "Delete", visuallyHiddenText: "lead tenant" },
        { href: "#", text: "Change", visuallyHiddenText: "lead tenant" },
      ],
    },
    rows: [
      {
        key: "Age",
        value: "38",
      },
      {
        key: "Nationality",
        value: "UK national resident in UK",
      },
      {
        key: "Working situation",
        value: "Part time – Loss of hours",
      },
    ],
  },
};
