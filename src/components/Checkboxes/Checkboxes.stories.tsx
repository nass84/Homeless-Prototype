import type { Meta, StoryObj } from "@storybook/react";
import { Checkboxes } from "./Checkboxes.js";
import { TextInput } from "../TextInput/TextInput.js";

const meta: Meta<typeof Checkboxes> = {
  title: "Components/Checkboxes",
  component: Checkboxes,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Let users select one or more options by using the checkboxes component.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/checkboxes/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Name attribute for the checkbox inputs",
    },
    legend: {
      control: "text",
      description: "Legend text for the fieldset",
    },
    hint: {
      control: "text",
      description: "Hint text to help users",
    },
    options: {
      control: "object",
      description: "Array of checkbox options",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    legendSize: {
      control: "radio",
      options: ["xl", "l", "m", "s"],
      description: "Size of the legend",
    },
    small: {
      control: "boolean",
      description: "Use small checkboxes variant",
    },
    defaultValue: {
      control: "object",
      description: "Array of pre-selected values",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "waste",
    legend: "Which types of waste do you transport?",
    hint: "Select all that apply",
    options: [
      { label: "Waste from animal carcasses", value: "carcasses" },
      { label: "Waste from mines or quarries", value: "mines" },
      { label: "Farm or agricultural waste", value: "farm" },
    ],
  },
};

export const WithHints: Story = {
  args: {
    name: "nationality",
    legend: "What is your nationality?",
    hint: "If you have dual nationality, select all options that are relevant to you.",
    options: [
      {
        label: "British",
        value: "british",
        hint: "including English, Scottish, Welsh and Northern Irish",
      },
      { label: "Irish", value: "irish" },
      { label: "Citizen of another country", value: "other" },
    ],
  },
};

export const WithNoneOption: Story = {
  args: {
    name: "countries",
    legend: "Will you be travelling to any of these countries?",
    hint: "Select all countries that apply",
    options: [
      { label: "France", value: "france" },
      { label: "Portugal", value: "portugal" },
      { label: "Spain", value: "spain" },
      {
        label: "No, I will not be travelling to any of these countries",
        value: "none",
        exclusive: true,
      },
    ],
  },
};

export const WithConditionalContent: Story = {
  args: {
    name: "contact",
    legend: "How would you like to be contacted?",
    hint: "Select all options that are relevant to you.",
    options: [
      {
        label: "Email",
        value: "email",
        conditionalContent: (
          <TextInput
            id="contact-email"
            name="contactEmail"
            label="Email address"
            type="email"
            autocomplete="email"
            spellcheck={false}
          />
        ),
      },
      {
        label: "Phone",
        value: "phone",
        conditionalContent: (
          <TextInput
            id="contact-phone"
            name="contactPhone"
            label="Phone number"
            type="tel"
            autocomplete="tel"
          />
        ),
      },
      {
        label: "Text message",
        value: "text",
        conditionalContent: (
          <TextInput
            id="contact-text"
            name="contactText"
            label="Mobile phone number"
            type="tel"
            autocomplete="tel"
          />
        ),
      },
    ],
  },
};

export const Small: Story = {
  args: {
    name: "organisation",
    legend: "Organisation",
    small: true,
    options: [
      { label: "HM Revenue and Customs (HMRC)", value: "hmrc" },
      { label: "Employment Tribunal", value: "employment-tribunal" },
      { label: "Ministry of Defence", value: "MOD" },
      { label: "Department for Transport", value: "DfT" },
    ],
  },
};

export const WithError: Story = {
  args: {
    name: "nationality-error",
    legend: "What is your nationality?",
    hint: "If you have dual nationality, select all options that are relevant to you.",
    error: "Select if you are British, Irish or a citizen of a different country",
    options: [
      {
        label: "British",
        value: "british",
        hint: "including English, Scottish, Welsh and Northern Irish",
      },
      { label: "Irish", value: "irish" },
      { label: "Citizen of another country", value: "other" },
    ],
  },
};
