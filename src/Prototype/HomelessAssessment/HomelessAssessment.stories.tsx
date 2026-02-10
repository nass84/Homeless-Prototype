import type { Meta, StoryObj } from '@storybook/react'
import { HomelessAssessment } from './HomelessAssessment.js'
import type { HomelessAssessmentData } from './HomelessAssessment.js'

const meta = {
  title: 'Forms/HomelessAssessment',
  component: HomelessAssessment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive assessment form for homeless persons applications, compliant with the Housing Act 1996 and Homelessness Reduction Act 2017.

## Features

- **Personal details capture**: Name, DOB, contact information
- **Housing situation assessment**: Current accommodation and circumstances
- **Support needs identification**: Mental health, physical disabilities, substance use
- **Priority need determination**: Dependent children, pregnancy, vulnerability factors
- **Interview guidance**: Built-in caseworker guidance with audio recording support
- **Accessibility**: Fully compliant with GOV.UK Design System and WCAG 2.1 AA

## Usage

This component provides a complete page template including header, navigation, and footer.
The form follows GOV.UK patterns for error handling, validation, and conditional content.

\`\`\`tsx
import { HomelessAssessment } from '@projectsbyif/gds-react'

function MyPage() {
  const handleSubmit = (data: HomelessAssessmentData) => {
    // Process the assessment data
    console.log('Assessment submitted:', data)
  }

  return (
    <HomelessAssessment
      serviceName="Your Council Homelessness Services"
      onSubmit={handleSubmit}
      showInterviewGuidance={true}
    />
  )
}
\`\`\`

## Legal Context

This assessment form is designed to support local housing authorities in fulfilling their duties under:
- Housing Act 1996 Part VII
- Homelessness Reduction Act 2017
- Equality Act 2010

The priority need categories align with the legal definitions of vulnerability and priority need
as set out in the Homelessness (Priority Need for Accommodation) (England) Order 2002.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    serviceName: {
      control: 'text',
      description: 'The name of the service displayed in the header',
      table: {
        defaultValue: { summary: 'Homelessness Services' },
      },
    },
    showInterviewGuidance: {
      control: 'boolean',
      description: 'Whether to show the interview guidance and recording feature for caseworkers',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback function called when the form is submitted with valid data',
    },
  },
} satisfies Meta<typeof HomelessAssessment>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default homeless persons assessment form with all features enabled,
 * including interview guidance and audio recording capability.
 */
export const Default: Story = {
  args: {
    serviceName: 'Homelessness Services',
    showInterviewGuidance: true,
    onSubmit: (data: HomelessAssessmentData) => {
      console.log('Assessment submitted:', data)
    },
  },
}

/**
 * Assessment form without the interview guidance section.
 * Suitable for self-service applications or when guidance is not needed.
 */
export const WithoutInterviewGuidance: Story = {
  args: {
    serviceName: 'Homelessness Services',
    showInterviewGuidance: false,
    onSubmit: (data: HomelessAssessmentData) => {
      console.log('Assessment submitted:', data)
    },
  },
}

/**
 * Example with a custom service name for a specific local authority.
 */
export const CustomServiceName: Story = {
  args: {
    serviceName: 'Westminster City Council Homelessness Services',
    showInterviewGuidance: true,
    onSubmit: (data: HomelessAssessmentData) => {
      console.log('Assessment submitted:', data)
    },
  },
}

/**
 * Minimal configuration showing required props only.
 * Uses default service name and includes interview guidance.
 */
export const Minimal: Story = {
  args: {},
}
