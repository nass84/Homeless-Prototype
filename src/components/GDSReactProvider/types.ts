export interface GDSReactConfig {
  /** Whether GOV.UK Frontend JS has been initialised */
  isInitialised: boolean;
  /** Re-initialise GOV.UK Frontend JS (useful after dynamic content changes) */
  reinitialise: () => void;
}

export interface GDSReactProviderProps {
  children: React.ReactNode;
  /*
   * Whether to automatically initialise GOV.UK Frontend JS on mount.
   * Defaults to true.
   *
   * Set to false if you need to control initialisation timing manually.
   */
  autoInit?: boolean;
  /**
   * Scope initialisation to a specific element.
   * Useful when only part of your page uses GOV.UK components.
   *
   * If not provided, initialises on document.body
   */
  scope?: HTMLElement | null;
}
