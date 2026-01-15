import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, type AccordionSection } from './Accordion.js'
import { Paragraph } from '../Paragraph/Paragraph.js'
import { Link } from '../Link/Link.js'
import { List } from '../List/List.js'

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `The accordion component lets users show and hide sections of related content on a page.

[Read more about how to use this component on the GOV.UK Design System](https://design-system.service.gov.uk/components/accordion/)`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the accordion',
    },
    sections: {
      control: 'object',
      description: 'Array of accordion sections with heading, content, and optional summary',
    },
    headingLevel: {
      control: 'radio',
      options: [2, 3, 4, 5, 6],
      description: 'Heading level for section headings',
    },
    rememberExpanded: {
      control: 'boolean',
      description: 'Whether to remember expanded state in browser',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultSections: AccordionSection[] = [
  {
    heading: 'Writing well for the web',
    content: <Paragraph>This is the content for Writing well for the web.</Paragraph>,
  },
  {
    heading: 'Writing well for specialists',
    content: <Paragraph>This is the content for Writing well for specialists.</Paragraph>,
  },
  {
    heading: 'Know your audience',
    content: <Paragraph>This is the content for Know your audience.</Paragraph>,
  },
  {
    heading: 'How people read',
    content: <Paragraph>This is the content for How people read.</Paragraph>,
  },
]

export const Default: Story = {
  args: {
    id: 'accordion-default',
    sections: defaultSections,
  },
}

const sectionsWithSummary: AccordionSection[] = [
  {
    heading: 'Understanding agile project management',
    summary: 'Introductions, methods, core features.',
    content: (
      <List
        type="bullet"
        items={[
          <Link href="#">Agile and government services: an introduction</Link>,
          <Link href="#">Agile methods: an introduction</Link>,
          <Link href="#">Core principles of agile</Link>,
        ]}
      />
    ),
  },
  {
    heading: 'Working with agile methods',
    summary: 'Workspaces, tools and techniques, user stories, planning.',
    content: (
      <List
        type="bullet"
        items={[
          <Link href="#">Creating an agile working environment</Link>,
          <Link href="#">Agile tools and techniques</Link>,
          <Link href="#">Set up a team wall</Link>,
          <Link href="#">Writing user stories</Link>,
          <Link href="#">Planning in agile</Link>,
          <Link href="#">Deciding on priorities</Link>,
          <Link href="#">Developing a roadmap</Link>,
        ]}
      />
    ),
  },
  {
    heading: 'Governing agile services',
    summary: 'Principles, measuring progress, spending money.',
    content: (
      <List
        type="bullet"
        items={[
          <Link href="#">Governance principles for agile service delivery</Link>,
          <Link href="#">Measuring and reporting progress</Link>,
          <Link href="#">Spend controls: check if you need approval to spend money on a service</Link>,
          <Link href="#">Spend controls: apply for approval to spend money on a service</Link>,
          <Link href="#">Spend controls: the approvals process</Link>,
          <Link href="#">Working across organisational boundaries</Link>,
        ]}
      />
    ),
  },
  {
    heading: 'Phases of an agile project',
    summary: 'Discovery, alpha, beta, live and retirement.',
    content: (
      <List
        type="bullet"
        items={[
          <Link href="#">How the discovery phase works</Link>,
          <Link href="#">How the alpha phase works</Link>,
          <Link href="#">How the beta phase works</Link>,
          <Link href="#">How the live phase works</Link>,
          <Link href="#">Retiring your service</Link>,
        ]}
      />
    ),
  },
]

export const WithSummary: Story = {
  args: {
    id: 'accordion-with-summary',
    sections: sectionsWithSummary,
  },
}
