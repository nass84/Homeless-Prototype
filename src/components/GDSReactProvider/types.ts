export interface GDSReactConfig {
  /** Whether GOV.UK Frontend JS has been initialised */
  isInitialised: boolean;
  /** Re-initialise GOV.UK Frontend JS (useful after dynamic content changes) */
  reinitialise: () => void;
  /** Optional custom Link component for routing libraries */
  linkComponent?: React.ComponentType<React.ComponentProps<"a">> | undefined;
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

  /**
   * Optional custom Link component to be used for internal links.
   * Useful for integrating with routing libraries like React Router or Next.js.
   *
   * If provided, this component will be used instead of a standard <a> element
   *
   * @example
   * ```tsx
   * import { GDSReactProvider } from "@projectsbyif/gds-react";
   * import Link from 'next/link'
   *
   * function App() {
   *   return (
   *     <GDSReactProvider linkComponent={({ href, children, ...props }) => (
   *         <NextLink
   *           href={href}
   *           // Don't prefetch certain links (e.g. logout url)
   *           prefetch={href?.includes('logout') ? false : undefined}
   *           {...props}
   *         >
   *           {children}
   *         </NextLink>
   *       )}>
   *       Components using internal links will use Next.js Link
   *       <YourApplication />
   *     </GDSReactProvider>
   *   );
   * }
   * ```
   */
  linkComponent?: React.ComponentType<React.ComponentProps<"a">>;
}
