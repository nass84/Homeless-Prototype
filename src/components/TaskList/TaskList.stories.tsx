import type { Meta, StoryObj } from "@storybook/react";
import { TaskList, TaskListGroup } from "./TaskList.js";

const meta: Meta<typeof TaskList> = {
  title: "Components/Task list",
  component: TaskList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `The task list component displays all the tasks a user needs to do, and allows users to easily identify which ones are done and which they still need to do.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/task-list/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "Array of task items",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
  args: {
    items: [
      {
        title: "Company directors",
        href: "#",
        status: "Completed",
      },
      {
        title: "Registered company details",
        href: "#",
        status: { text: "Incomplete", colour: "blue" },
      },
      {
        title: "Financial history",
        href: "#",
        hint: "Include 5 years of the company's relevant financial information",
        status: { text: "Incomplete", colour: "blue" },
      },
      {
        title: "Business plan",
        href: "#",
        status: { text: "Incomplete", colour: "blue" },
      },
      {
        title: "References",
        href: "#",
        status: { text: "Incomplete", colour: "blue" },
      },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    items: [
      {
        title: "Company directors",
        href: "#",
        status: "Completed",
      },
      {
        title: "Registered company details",
        href: "#",
        status: "Completed",
      },
      {
        title: "Financial history",
        href: "#",
        hint: "Include 5 years of the company's relevant financial information",
        status: "Completed",
      },
      {
        title: "Business plan",
        href: "#",
        status: "Completed",
      },
      {
        title: "References",
        href: "#",
        status: "Completed",
      },
    ],
  },
};

export const WithGroups: StoryObj<typeof TaskListGroup> = {
  render: () => (
    <>
      <TaskListGroup
        heading="Check before you start"
        items={[
          {
            title: "Check eligibility",
            href: "#",
            status: "Completed",
          },
          {
            title: "Read declaration",
            href: "#",
            status: "Completed",
          },
        ]}
      />
      <TaskListGroup
        heading="Prepare application"
        items={[
          {
            title: "Company directors",
            href: "#",
            status: "Completed",
          },
          {
            title: "Registered company details",
            href: "#",
            status: { text: "Incomplete", colour: "blue" },
          },
          {
            title: "Financial history",
            href: "#",
            hint: "Include 5 years of the company's relevant financial information",
            status: { text: "Incomplete", colour: "blue" },
          },
        ]}
      />
      <TaskListGroup
        heading="Submit and pay"
        items={[
          {
            title: "Submit application",
            href: "#",
            status: { text: "Cannot start yet", colour: "grey" },
          },
          {
            title: "Pay fee",
            href: "#",
            status: { text: "Cannot start yet", colour: "grey" },
          },
        ]}
      />
    </>
  ),
};
