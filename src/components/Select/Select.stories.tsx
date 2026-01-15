import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select.js";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `The select component allows users to choose an option from a long list. It should only be used as a last resort in public-facing services because research shows that some users find selects very difficult to use.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/select/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "The ID for the select element",
    },
    name: {
      control: "text",
      description: "The name attribute for the select",
    },
    label: {
      control: "text",
      description: "The label text for the select",
    },
    labelAsHeading: {
      control: "boolean",
      description: "Whether to wrap the label in an h1 element",
    },
    labelSize: {
      control: "radio",
      options: ["l", "m", "s"],
      description: "The size of the label when used as heading",
    },
    hint: {
      control: "text",
      description: "Hint text to help the user",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    options: {
      description: "Array of select options",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "sort",
    name: "sort",
    label: "Sort by",
    options: [
      { value: "published", text: "Recently published" },
      { value: "updated", text: "Recently updated", selected: true },
      { value: "views", text: "Most views" },
      { value: "comments", text: "Most comments" },
    ],
    defaultValue: "updated",
  },
};

export const WithHint: Story = {
  args: {
    id: "location-hint",
    name: "location",
    label: "Choose location",
    hint: "This can be different to where you went before",
    options: [
      { value: "", text: "Choose location" },
      { value: "eastmidlands", text: "East Midlands" },
      { value: "eastofengland", text: "East of England" },
      { value: "london", text: "London" },
      { value: "northeast", text: "North East" },
      { value: "northwest", text: "North West" },
      { value: "southeast", text: "South East" },
      { value: "southwest", text: "South West" },
      { value: "westmidlands", text: "West Midlands" },
      { value: "yorkshire", text: "Yorkshire and the Humber" },
    ],
  },
};

export const WithError: Story = {
  args: {
    id: "location-error",
    name: "location",
    label: "Choose location",
    error: "Select a location",
    options: [
      { value: "", text: "Choose location" },
      { value: "eastmidlands", text: "East Midlands" },
      { value: "eastofengland", text: "East of England" },
      { value: "london", text: "London" },
      { value: "northeast", text: "North East" },
      { value: "northwest", text: "North West" },
      { value: "southeast", text: "South East" },
      { value: "southwest", text: "South West" },
      { value: "westmidlands", text: "West Midlands" },
      { value: "yorkshire", text: "Yorkshire and the Humber" },
    ],
  },
};
