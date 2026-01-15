import type { Meta, StoryObj } from "@storybook/react";
import { Radios } from "./Radios.js";

const meta: Meta<typeof Radios> = {
  title: "Components/Radios",
  component: Radios,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the radios component when users can only select one option from a list.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/radios/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name attribute for the radio group",
    },
    legend: {
      control: "text",
      description: "The legend text for the fieldset",
    },
    hint: {
      control: "text",
      description: "Hint text to help the user",
    },
    options: {
      description: "Array of radio options",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    legendSize: {
      control: "radio",
      options: ["xl", "l", "m", "s"],
      description: "The size of the legend",
    },
    inline: {
      control: "boolean",
      description: "Display radios inline (side by side)",
    },
    small: {
      control: "boolean",
      description: "Use smaller radio buttons",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "where-do-you-live",
    legend: "Where do you live?",
    options: [
      { label: "England", value: "england" },
      { label: "Scotland", value: "scotland" },
      { label: "Wales", value: "wales" },
      { label: "Northern Ireland", value: "northern-ireland" },
    ],
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 325,
      },
    },
  },
};

export const WithoutHeading: Story = {
  args: {
    name: "where-do-you-live-no-heading",
    legend: "Where do you live?",
    legendSize: "m",
    options: [
      { label: "England", value: "england" },
      { label: "Scotland", value: "scotland" },
      { label: "Wales", value: "wales" },
      { label: "Northern Ireland", value: "northern-ireland" },
    ],
  },
};

export const Inline: Story = {
  args: {
    name: "changed-name",
    legend: "Have you changed your name?",
    hint: "This includes changing your last name or spelling your name differently.",
    inline: true,
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
};

export const WithHints: Story = {
  args: {
    name: "sign-in",
    legend: "How do you want to sign in?",
    options: [
      {
        label: "Sign in with Government Gateway",
        value: "government-gateway",
        hint: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before.",
      },
      {
        label: "Sign in with GOV.UK One Login",
        value: "govuk-one-login",
        hint: "If you don't have a GOV.UK One Login, you can create one.",
      },
    ],
  },
};

export const WithDivider: Story = {
  args: {
    name: "where-do-you-live-divider",
    legend: "Where do you live?",
    options: [
      { label: "England", value: "england" },
      { label: "Scotland", value: "scotland" },
      { label: "Wales", value: "wales" },
      { label: "Northern Ireland", value: "northern-ireland" },
      {
        label: "I am a British citizen living abroad",
        value: "abroad",
        divider: true,
      },
    ],
  },
};

export const ConditionallyRevealing: Story = {
  args: {
    name: "contact",
    legend: "How would you prefer to be contacted?",
    hint: "Select one option.",
    options: [
      {
        label: "Email",
        value: "email",
        conditionalContent: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-by-email">
              Email address
            </label>
            <input
              className="govuk-input govuk-!-width-one-third"
              id="contact-by-email"
              name="contact-by-email"
              type="email"
              spellCheck={false}
              autoComplete="email"
            />
          </div>
        ),
      },
      {
        label: "Phone",
        value: "phone",
        conditionalContent: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-by-phone">
              Phone number
            </label>
            <input
              className="govuk-input govuk-!-width-one-third"
              id="contact-by-phone"
              name="contact-by-phone"
              type="tel"
              autoComplete="tel"
            />
          </div>
        ),
      },
      {
        label: "Text message",
        value: "text",
        conditionalContent: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-by-text">
              Mobile phone number
            </label>
            <input
              className="govuk-input govuk-!-width-one-third"
              id="contact-by-text"
              name="contact-by-text"
              type="tel"
              autoComplete="tel"
            />
          </div>
        ),
      },
    ],
  },
};

export const Small: Story = {
  args: {
    name: "filter",
    legend: "Filter",
    legendSize: "m",
    small: true,
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
    ],
  },
};

export const WithError: Story = {
  args: {
    name: "where-do-you-live-error",
    legend: "Where do you live?",
    error: "Select where you live",
    options: [
      { label: "England", value: "england" },
      { label: "Scotland", value: "scotland" },
      { label: "Wales", value: "wales" },
      { label: "Northern Ireland", value: "northern-ireland" },
    ],
  },
};
