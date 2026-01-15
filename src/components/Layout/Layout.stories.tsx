import type { Meta, StoryObj } from '@storybook/react'
import { GridRow, GridColumn, WidthContainer, MainWrapper } from './Layout.js'

const ExampleBox = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '15px',
      backgroundColor: '#1d70b8',
      color: '#fff',
      textAlign: 'center',
      outline: '2px solid #003078',
    }}
    className='govuk-body'
  >
    {children}
  </div>
)

const meta: Meta<typeof GridRow> = {
  title: 'Page Structure/Layout',
  component: GridRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Use the grid system to lay out the content on your service's pages.

The grid is structured with a \`govuk-grid-row\` wrapper which acts as a row to hold your grid columns. You can add columns inside this wrapper to create your layout.

[Read more about how to use layout on the GOV.UK Design System](https://design-system.service.gov.uk/styles/layout/)`,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const FullWidth: Story = {
  render: () => (
    <GridRow>
      <GridColumn width="full">
        <ExampleBox>Full width</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
}

export const OneHalf: Story = {
  render: () => (
    <GridRow>
      <GridColumn width="one-half">
        <ExampleBox>One half</ExampleBox>
      </GridColumn>
      <GridColumn width="one-half">
        <ExampleBox>One half</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
}

export const OneThird: Story = {
  render: () => (
    <GridRow>
      <GridColumn width="one-third">
        <ExampleBox>One third</ExampleBox>
      </GridColumn>
      <GridColumn width="one-third">
        <ExampleBox>One third</ExampleBox>
      </GridColumn>
      <GridColumn width="one-third">
        <ExampleBox>One third</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
}

export const TwoThirds: Story = {
  render: () => (
    <GridRow>
      <GridColumn width="two-thirds">
        <ExampleBox>Two thirds</ExampleBox>
      </GridColumn>
      <GridColumn width="one-third">
        <ExampleBox>One third</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
}

export const OneQuarter: Story = {
  render: () => (
    <GridRow>
      <GridColumn width="one-quarter">
        <ExampleBox>One quarter</ExampleBox>
      </GridColumn>
      <GridColumn width="one-quarter">
        <ExampleBox>One quarter</ExampleBox>
      </GridColumn>
      <GridColumn width="one-quarter">
        <ExampleBox>One quarter</ExampleBox>
      </GridColumn>
      <GridColumn width="one-quarter">
        <ExampleBox>One quarter</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
}

export const ThreeQuarters: Story = {
  render: () => (
    <GridRow>
      <GridColumn width="three-quarters">
        <ExampleBox>Three quarters</ExampleBox>
      </GridColumn>
      <GridColumn width="one-quarter">
        <ExampleBox>One quarter</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
}

export const TwoThirdsLayout: Story = {
  name: 'Two-thirds layout',
  render: () => (
    <GridRow>
      <GridColumn width="two-thirds">
        <ExampleBox>Two thirds</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Your main content should take up two-thirds of the screen on desktop.',
      },
    },
  },
}

export const TwoThirdsOneThirdLayout: Story = {
  name: 'Two-thirds and one-third layout',
  render: () => (
    <GridRow>
      <GridColumn width="two-thirds">
        <ExampleBox>Two thirds</ExampleBox>
      </GridColumn>
      <GridColumn width="one-third">
        <ExampleBox>One third</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use this layout if you need to include a sidebar with supporting information alongside your main content.',
      },
    },
  },
}

export const ResponsiveColumns: Story = {
  name: 'Responsive columns',
  render: () => (
    <GridRow>
      <GridColumn width="one-half" widthFromDesktop="two-thirds-from-desktop">
        <ExampleBox>One half on tablet, two thirds on desktop</ExampleBox>
      </GridColumn>
      <GridColumn width="one-half" widthFromDesktop="one-third-from-desktop">
        <ExampleBox>One half on tablet, one third on desktop</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use desktop-specific classes to change column widths at different breakpoints. On mobile, columns stack. On tablet, they become one-half each. On desktop, they become two-thirds and one-third.',
      },
    },
  },
}

export const NestedGrids: Story = {
  name: 'Nested grids',
  render: () => (
    <GridRow>
      <GridColumn width="two-thirds">
        <ExampleBox>Two thirds</ExampleBox>
        <GridRow>
          <GridColumn width="one-half">
            <ExampleBox>One half (nested)</ExampleBox>
          </GridColumn>
          <GridColumn width="one-half">
            <ExampleBox>One half (nested)</ExampleBox>
          </GridColumn>
        </GridRow>
      </GridColumn>
      <GridColumn width="one-third">
        <ExampleBox>One third</ExampleBox>
      </GridColumn>
    </GridRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'You can nest grid columns inside other grid columns to create more complex layouts.',
      },
    },
  },
}

export const WidthContainerExample: Story = {
  name: 'Width container',
  render: () => (
    <WidthContainer>
      <GridRow>
        <GridColumn width="two-thirds">
          <ExampleBox>Content inside width container</ExampleBox>
        </GridColumn>
      </GridRow>
    </WidthContainer>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The width container sets the maximum width of the content on the page. Use it to wrap your main content area.',
      },
    },
  },
}

export const MainWrapperExample: Story = {
  name: 'Main wrapper',
  render: () => (
    <WidthContainer>
      <MainWrapper>
        <GridRow>
          <GridColumn width="two-thirds">
            <ExampleBox>Content inside main wrapper</ExampleBox>
          </GridColumn>
        </GridRow>
      </MainWrapper>
    </WidthContainer>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The main wrapper adds responsive top and bottom padding. Use it around your main content area.',
      },
    },
  },
}

export const MainWrapperAutoSpacing: Story = {
  name: 'Main wrapper with auto spacing',
  render: () => (
    <WidthContainer>
      <MainWrapper autoSpacing>
        <GridRow>
          <GridColumn width="two-thirds">
            <ExampleBox>Content with auto spacing (no back link above)</ExampleBox>
          </GridColumn>
        </GridRow>
      </MainWrapper>
    </WidthContainer>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Use auto spacing when there is no back link or breadcrumbs above the main wrapper. This adds appropriate top spacing.',
      },
    },
  },
}
