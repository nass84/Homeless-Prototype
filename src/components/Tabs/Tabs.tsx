import { type ReactNode, useEffect } from "react";

import '../../styles/core.scss'
import "govuk-frontend/dist/govuk/components/tabs/_tabs.scss";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  title?: string;
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
}

export function Tabs({
  title = "Contents",
  tabs,
  defaultTabId,
  className = "",
}: TabsProps) {
  const initialise = async () => {
    // Dynamic import to avoid SSR issues
    const { Tabs, createAll } = await import("govuk-frontend");
    createAll(Tabs);
  };

  useEffect(() => {
    initialise();
  }, []);

  // Determine initial selected tab for SSR rendering
  const selectedId = defaultTabId || tabs[0]?.id || "";

  const tabsClass = `govuk-tabs${className ? ` ${className}` : ""}`;

  return (
    <div className={tabsClass} data-module="govuk-tabs">
      <h2 className="govuk-tabs__title">{title}</h2>

      <ul className="govuk-tabs__list">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`govuk-tabs__list-item${
              tab.id === selectedId ? " govuk-tabs__list-item--selected" : ""
            }`}
          >
            <a className="govuk-tabs__tab" href={`#${tab.id}`}>
              {tab.label}
            </a>
          </li>
        ))}
      </ul>

      {tabs.map((tab) => (
        <div
          key={`panel-${tab.id}`}
          className={`govuk-tabs__panel${
            tab.id !== selectedId ? " govuk-tabs__panel--hidden" : ""
          }`}
          id={tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
