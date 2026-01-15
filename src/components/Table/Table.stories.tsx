import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table.js";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the table component to make information easier to compare and scan for users.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/table/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    caption: {
      control: "text",
      description: "The table caption",
    },
    captionSize: {
      control: "radio",
      options: ["s", "m", "l", "xl"],
      description: "The size of the caption",
    },
    headers: {
      description: "Array of table headers",
    },
    rows: {
      description: "Array of table rows",
    },
    firstCellIsHeader: {
      control: "boolean",
      description: "Treat the first cell in each row as a header",
    },
    smallTextUntilTablet: {
      control: "boolean",
      description: "Use smaller text on mobile for large data tables",
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
    caption: "Dates and amounts",
    headers: [{ text: "Date" }, { text: "Amount" }],
    rows: [
      { cells: [{ text: "First 6 weeks" }, { text: "£109.80 per week" }] },
      { cells: [{ text: "Next 33 weeks" }, { text: "£109.80 per week" }] },
      { cells: [{ text: "Total estimated pay" }, { text: "£4,282.20" }] },
    ],
  },
};

export const CustomCaptionSize: Story = {
  args: {
    caption: "Months and rates",
    captionSize: "l",
    headers: [{ text: "Month" }, { text: "Rate" }],
    rows: [
      { cells: [{ text: "January" }, { text: "£85" }] },
      { cells: [{ text: "February" }, { text: "£75" }] },
      { cells: [{ text: "March" }, { text: "£165" }] },
    ],
  },
};

export const WithRowHeaders: Story = {
  args: {
    caption: "Months and rates",
    firstCellIsHeader: true,
    headers: [{ text: "Month" }, { text: "Rate for bicycles" }, { text: "Rate for vehicles" }],
    rows: [
      { cells: [{ text: "January" }, { text: "£85" }, { text: "£95" }] },
      { cells: [{ text: "February" }, { text: "£75" }, { text: "£55" }] },
      { cells: [{ text: "March" }, { text: "£165" }, { text: "£125" }] },
    ],
  },
};

export const NumericData: Story = {
  args: {
    caption: "Months and rates",
    firstCellIsHeader: true,
    headers: [
      { text: "Month" },
      { text: "Rate for bicycles", format: "numeric" },
      { text: "Rate for vehicles", format: "numeric" },
    ],
    rows: [
      {
        cells: [
          { text: "January" },
          { text: "£85", format: "numeric" },
          { text: "£95", format: "numeric" },
        ],
      },
      {
        cells: [
          { text: "February" },
          { text: "£75", format: "numeric" },
          { text: "£55", format: "numeric" },
        ],
      },
      {
        cells: [
          { text: "March" },
          { text: "£165", format: "numeric" },
          { text: "£125", format: "numeric" },
        ],
      },
    ],
  },
};

export const CustomColumnWidths: Story = {
  args: {
    caption: "Dates and amounts",
    headers: [
      { text: "Date", width: "one-half" },
      { text: "Amount", width: "one-half" },
    ],
    rows: [
      { cells: [{ text: "First 6 weeks" }, { text: "£109.80 per week" }] },
      { cells: [{ text: "Next 33 weeks" }, { text: "£109.80 per week" }] },
      { cells: [{ text: "Total estimated pay" }, { text: "£4,282.20" }] },
    ],
  },
};

export const SmallTextUntilTablet: Story = {
  args: {
    caption: "Monthly data comparison",
    smallTextUntilTablet: true,
    firstCellIsHeader: true,
    headers: [
      { text: "Month" },
      { text: "Rate for bicycles", format: "numeric" },
      { text: "Rate for vehicles", format: "numeric" },
      { text: "Rate for pedestrians", format: "numeric" },
    ],
    rows: [
      {
        cells: [
          { text: "January" },
          { text: "£85", format: "numeric" },
          { text: "£95", format: "numeric" },
          { text: "£45", format: "numeric" },
        ],
      },
      {
        cells: [
          { text: "February" },
          { text: "£75", format: "numeric" },
          { text: "£55", format: "numeric" },
          { text: "£35", format: "numeric" },
        ],
      },
      {
        cells: [
          { text: "March" },
          { text: "£165", format: "numeric" },
          { text: "£125", format: "numeric" },
          { text: "£65", format: "numeric" },
        ],
      },
      {
        cells: [
          { text: "April" },
          { text: "£120", format: "numeric" },
          { text: "£105", format: "numeric" },
          { text: "£55", format: "numeric" },
        ],
      },
      {
        cells: [
          { text: "May" },
          { text: "£145", format: "numeric" },
          { text: "£115", format: "numeric" },
          { text: "£75", format: "numeric" },
        ],
      },
    ],
  },
};
