import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload.js";

const meta: Meta<typeof FileUpload> = {
  title: "Components/File upload",
  component: FileUpload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Help users select and upload a file.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/file-upload/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the file input",
    },
    name: {
      control: "text",
      description: "Name attribute for the file input",
    },
    label: {
      control: "text",
      description: "Label text for the file input",
    },
    hint: {
      control: "text",
      description: "Hint text to help users",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    accept: {
      control: "text",
      description: "Accepted file types (e.g., .jpg,.png,.pdf)",
    },
    multiple: {
      control: "boolean",
      description: "Whether to allow multiple file selection",
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
    id: "file-upload-1",
    name: "fileUpload1",
    label: "Upload a file",
  },
};

export const WithError: Story = {
  args: {
    id: "file-upload-error",
    name: "fileUploadError",
    label: "Upload a file",
    error: "The selected file must be smaller than 2MB",
  },
};
