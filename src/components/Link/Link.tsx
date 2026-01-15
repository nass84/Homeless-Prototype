import type { ReactNode } from 'react'
import { useGDSReact } from '../GDSReactProvider/GDSReactProvider.js'

export interface LinkProps {
  href: string
  children: ReactNode
  noVisitedState?: boolean
  inverse?: boolean
  noUnderline?: boolean
  opensInNewTab?: boolean
  external?: boolean
  hreflang?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Link({
  href,
  children,
  noVisitedState = false,
  inverse = false,
  noUnderline = false,
  opensInNewTab = false,
  external = false,
  hreflang,
  className = '',
  onClick = undefined,
}: LinkProps) {
  const { linkComponent: LinkComponent } = useGDSReact()

  // External links should open in new tab
  const shouldOpenInNewTab = opensInNewTab || external

  // Build class names
  const noVisitedClass = noVisitedState ? ' govuk-link--no-visited-state' : ''
  const inverseClass = inverse ? ' govuk-link--inverse' : ''
  const noUnderlineClass = noUnderline ? ' govuk-link--no-underline' : ''
  const linkClass = `govuk-link${noVisitedClass}${inverseClass}${noUnderlineClass}${className ? ` ${className}` : ''}`

  // Props for new tab links
  const newTabProps = shouldOpenInNewTab
    ? {
        target: '_blank' as const,
        rel: 'noreferrer noopener',
      }
    : {}

  const hreflangProp = hreflang ? { hrefLang: hreflang } : {}

  const handleClick = onClick
    ? (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick(event)
        event.preventDefault()
      }
    : undefined

  // Content including the visually hidden text for new tab links
  const content = (
    <>
      {children}
      {shouldOpenInNewTab && <span className="govuk-visually-hidden"> (opens in new tab)</span>}
    </>
  )

  // Common props for both native and custom link components
  const commonProps = {
    href,
    className: linkClass,
    ...newTabProps,
    ...hreflangProp,
    onClick: handleClick,
  }

  if (LinkComponent) {
    return <LinkComponent {...commonProps}>{content}</LinkComponent>
  }

  return <a {...commonProps}>{content}</a>
}