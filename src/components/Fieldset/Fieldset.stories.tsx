import type { Meta, StoryObj } from "@storybook/react";
import { Fieldset } from "./Fieldset.js";
import { TextInput } from "../TextInput/TextInput.js";

const meta: Meta<typeof Fieldset> = {
  title: "Components/Fieldset",
  component: Fieldset,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Use the fieldset component to group related form inputs.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/fieldset/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    legend: {
      control: "text",
      description: "The legend text for the fieldset",
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
    children: {
      description: "The form inputs to group",
    },
    ariaDescribedBy: {
      control: "text",
      description: "ID of element that describes the fieldset",
    },
    role: {
      control: "text",
      description: "ARIA role attribute",
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
    legend: "What is your address?",
    legendAsHeading: true,
    children: (
      <>
        <TextInput
          id="address-line-1"
          name="addressLine1"
          label="Address line 1"
          width="two-thirds"
          autocomplete="address-line1"
        />
        <TextInput
          id="address-line-2"
          name="addressLine2"
          label="Address line 2 (optional)"
          width="two-thirds"
          autocomplete="address-line2"
        />
        <TextInput
          id="address-town"
          name="addressTown"
          label="Town or city"
          width="one-third"
          autocomplete="address-level2"
        />
        <TextInput
          id="address-postcode"
          name="addressPostcode"
          label="Postcode"
          width="one-quarter"
          autocomplete="postal-code"
        />
      </>
    ),
  },
};
