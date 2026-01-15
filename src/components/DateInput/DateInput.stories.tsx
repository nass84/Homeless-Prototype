import type { Meta, StoryObj } from "@storybook/react";
import { DateInput } from "./DateInput.js";

const meta: Meta<typeof DateInput> = {
  title: "Components/Date input",
  component: DateInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the date input component to help users enter a memorable date or one they can easily look up.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/date-input/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the date input group",
    },
    namePrefix: {
      control: "text",
      description: "Prefix for the name attributes of the inputs",
    },
    legend: {
      control: "text",
      description: "Legend text for the fieldset",
    },
    legendAsHeading: {
      control: "boolean",
      description: "Whether to render the legend as a page heading",
    },
    legendSize: {
      control: "radio",
      options: ["xl", "l", "m", "s"],
      description: "Size of the legend",
    },
    hint: {
      control: "text",
      description: "Hint text to help users",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    errorFields: {
      control: "object",
      description: "Array of fields to highlight with error styling",
    },
    dayValue: {
      control: "text",
      description: "Value for the day input",
    },
    monthValue: {
      control: "text",
      description: "Value for the month input",
    },
    yearValue: {
      control: "text",
      description: "Value for the year input",
    },
    autocomplete: {
      control: "text",
      description: "Autocomplete type (e.g., 'bday' for birthday)",
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
    id: "passport-issued",
    namePrefix: "passport-issued",
    legend: "When was your passport issued?",
    legendAsHeading: true,
    hint: "For example, 27 3 2007",
  },
};

export const DateOfBirth: Story = {
  args: {
    id: "dob",
    namePrefix: "dob",
    legend: "What is your date of birth?",
    legendAsHeading: true,
    hint: "For example, 31 3 1980",
    autocomplete: "bday",
  },
};

export const WithErrorOnAllFields: Story = {
  args: {
    id: "passport-issued-error",
    namePrefix: "passport-issued-error",
    legend: "When was your passport issued?",
    legendAsHeading: true,
    hint: "For example, 27 3 2007",
    error: "The date your passport was issued must be in the past",
    dayValue: "6",
    monthValue: "3",
    yearValue: "2076",
  },
};

export const WithErrorOnSingleField: Story = {
  args: {
    id: "passport-issued-year-error",
    namePrefix: "passport-issued-year-error",
    legend: "When was your passport issued?",
    legendAsHeading: true,
    hint: "For example, 27 3 2007",
    error: "The date your passport was issued must include a year",
    errorFields: ["year"],
    dayValue: "6",
    monthValue: "3",
  },
};

export const WithoutHeading: Story = {
  args: {
    id: "passport-issued-no-heading",
    namePrefix: "passport-issued-no-heading",
    legend: "When was your passport issued?",
    legendAsHeading: false,
    hint: "For example, 27 3 2007",
  },
};
