import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs.js";
import { Table } from "../Table/Table.js";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `The tabs component lets users navigate between related sections of content, displaying one section at a time.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/tabs/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title for the tabs (visually hidden on larger screens)",
    },
    tabs: {
      description: "Array of tab objects with id, label, and content",
    },
    defaultTabId: {
      control: "text",
      description: "The ID of the tab to show by default",
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
    tabs: [
      {
        id: "past-day",
        label: "Past day",
        content: (
          <>
            <h2 className="govuk-heading-l">Past day</h2>
            <Table
              headers={[
                { text: "Case manager" },
                { text: "Cases opened", format: "numeric" },
                { text: "Cases closed", format: "numeric" },
              ]}
              rows={[
                {
                  cells: [
                    { text: "David Francis" },
                    { text: "3", format: "numeric" },
                    { text: "0", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Paul Farmer" },
                    { text: "1", format: "numeric" },
                    { text: "0", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Rita Patel" },
                    { text: "2", format: "numeric" },
                    { text: "0", format: "numeric" },
                  ],
                },
              ]}
            />
          </>
        ),
      },
      {
        id: "past-week",
        label: "Past week",
        content: (
          <>
            <h2 className="govuk-heading-l">Past week</h2>
            <Table
              headers={[
                { text: "Case manager" },
                { text: "Cases opened", format: "numeric" },
                { text: "Cases closed", format: "numeric" },
              ]}
              rows={[
                {
                  cells: [
                    { text: "David Francis" },
                    { text: "24", format: "numeric" },
                    { text: "18", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Paul Farmer" },
                    { text: "16", format: "numeric" },
                    { text: "20", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Rita Patel" },
                    { text: "24", format: "numeric" },
                    { text: "27", format: "numeric" },
                  ],
                },
              ]}
            />
          </>
        ),
      },
      {
        id: "past-month",
        label: "Past month",
        content: (
          <>
            <h2 className="govuk-heading-l">Past month</h2>
            <Table
              headers={[
                { text: "Case manager" },
                { text: "Cases opened", format: "numeric" },
                { text: "Cases closed", format: "numeric" },
              ]}
              rows={[
                {
                  cells: [
                    { text: "David Francis" },
                    { text: "98", format: "numeric" },
                    { text: "95", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Paul Farmer" },
                    { text: "122", format: "numeric" },
                    { text: "131", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Rita Patel" },
                    { text: "126", format: "numeric" },
                    { text: "142", format: "numeric" },
                  ],
                },
              ]}
            />
          </>
        ),
      },
      {
        id: "past-year",
        label: "Past year",
        content: (
          <>
            <h2 className="govuk-heading-l">Past year</h2>
            <Table
              headers={[
                { text: "Case manager" },
                { text: "Cases opened", format: "numeric" },
                { text: "Cases closed", format: "numeric" },
              ]}
              rows={[
                {
                  cells: [
                    { text: "David Francis" },
                    { text: "1380", format: "numeric" },
                    { text: "1472", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Paul Farmer" },
                    { text: "1129", format: "numeric" },
                    { text: "1083", format: "numeric" },
                  ],
                },
                {
                  cells: [
                    { text: "Rita Patel" },
                    { text: "1539", format: "numeric" },
                    { text: "1265", format: "numeric" },
                  ],
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
};
