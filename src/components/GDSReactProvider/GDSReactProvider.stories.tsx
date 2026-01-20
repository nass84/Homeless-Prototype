import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Accordion } from "../Accordion/Accordion.js";
import { Button } from "../Button/Button.js";
import { Heading } from "../Heading/Heading.js";
import { InsetText } from "../InsetText/InsetText.js";
import { Paragraph } from "../Paragraph/Paragraph.js";
import { Radios } from "../Radios/Radios.js";
import { TextInput } from "../TextInput/TextInput.js";
import { GDSReactProvider, useGDSReact } from "./GDSReactProvider.js";

const meta: Meta<typeof GDSReactProvider> = {
  title: "Core/GDSReactProvider",
  component: GDSReactProvider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The GDSReactProvider initialises GOV.UK Frontend for your React application.

Wrap your application (or the GOV.UK-styled section) with this provider to:
- Load GOV.UK Frontend CSS
- Initialise JavaScript behaviours (accordions, character counts, etc.)

For routing integration (Next.js, React Router, etc.), see the Link component's \`asChild\` prop.
        `,
      },
    },
  },
  argTypes: {
    autoInit: {
      control: "boolean",
      description: "Whether to auto-initialise on mount",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to show initialisation status
function InitStatus() {
  const { isInitialised } = useGDSReact();
  return (
    <InsetText>
      <Paragraph>
        <strong>Initialised:</strong> {isInitialised ? "Yes ✓" : "No"}
      </Paragraph>
    </InsetText>
  );
}

// Demo with GOV.UK components
function GovUKDemo() {
  return (
    <div>
      <Heading level={1} size="xl">
        GOV.UK Frontend Demo
      </Heading>

      <InitStatus />

      <Heading level={2} size="l">
        Example Components
      </Heading>

      <TextInput id="input-example" name="input-example" label="Text input" />

      <Radios
        name="radio-group"
        legend="Example radio buttons"
        legendSize="s"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <Button type="submit">Submit</Button>
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <GDSReactProvider {...args}>
      <GovUKDemo />
    </GDSReactProvider>
  ),
  args: {
    autoInit: true,
  },
};

// Demo showing manual reinitialisation
function DynamicContentDemo() {
  const { reinitialise } = useGDSReact();
  const [showAccordion, setShowAccordion] = useState(false);

  useEffect(() => {
    if (showAccordion) {
      // Reinitialise after dynamic content is added
      reinitialise();
    }
  }, [showAccordion, reinitialise]);

  return (
    <div>
      <Heading level={1} size="xl">
        Dynamic Content Demo
      </Heading>

      <Paragraph>
        Click the button to dynamically add a GOV.UK accordion. The provider
        will reinitialise to enable its JavaScript behaviour.
      </Paragraph>

      <Button
        type="button"
        variant="secondary"
        onClick={() => setShowAccordion(!showAccordion)}
      >
        {showAccordion ? "Hide" : "Show"} Accordion
      </Button>

      {showAccordion && (
        <div style={{ marginTop: "20px" }}>
          <Accordion
            id="accordion-demo"
            sections={[
              {
                heading: "Section 1",
                content: (
                  <Paragraph>
                    This accordion was added dynamically and initialised via
                    reinitialise().
                  </Paragraph>
                ),
              },
              {
                heading: "Section 2",
                content: <Paragraph>More content here.</Paragraph>,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export const DynamicContent: Story = {
  render: () => (
    <GDSReactProvider>
      <DynamicContentDemo />
    </GDSReactProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using `reinitialise()` when adding GOV.UK components dynamically.",
      },
    },
  },
};
