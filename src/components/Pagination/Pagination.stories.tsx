import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination.js";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Help users navigate forwards and backwards through a series of pages.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/pagination/)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["numbered", "block"],
      description: "The pagination variant",
    },
    ariaLabel: {
      control: "text",
      description: "Aria label for the navigation",
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
    pagination: {
      page: 2,
      pageSize: 10,
      totalPages: 3,
      totalItems: 30,
      hasNextPage: true,
      hasPreviousPage: true,
    },
    onPageChange: (page) => console.log(`Page changed to ${page}`),
  },
};

export const WithEllipsis: Story = {
  args: {
    pagination: {
      page: 7,
      pageSize: 10,
      totalPages: 42,
      totalItems: 420,
      hasNextPage: true,
      hasPreviousPage: true,
    },
    onPageChange: (page) => console.log(`Page changed to ${page}`),
  },
};

export const FirstPage: Story = {
  args: {
    pagination: {
      page: 1,
      pageSize: 10,
      totalPages: 3,
      totalItems: 30,
      hasNextPage: true,
      hasPreviousPage: false,
    },
    onPageChange: (page) => console.log(`Page changed to ${page}`),
  },
};

export const LastPage: Story = {
  args: {
    pagination: {
      page: 3,
      pageSize: 10,
      totalPages: 3,
      totalItems: 30,
      hasNextPage: false,
      hasPreviousPage: true,
    },
    onPageChange: (page) => console.log(`Page changed to ${page}`),
  },
};

export const Block: Story = {
  args: {
    variant: "block",
    previous: {
      href: "#",
      label: "Applying for a provisional lorry or bus licence",
    },
    next: {
      href: "#",
      label: "Driver CPC part 1 test: theory",
    },
  },
};

export const BlockFirstPage: Story = {
  args: {
    variant: "block",
    next: {
      href: "#",
      label: "Driver CPC part 1 test: theory",
    },
  },
};

export const BlockLastPage: Story = {
  args: {
    variant: "block",
    previous: {
      href: "#",
      label: "Applying for a provisional lorry or bus licence",
    },
  },
};
