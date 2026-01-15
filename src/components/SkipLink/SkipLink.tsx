import type { ReactNode } from 'react'
import { Link } from '../Link/Link.js'

export interface SkipLinkProps {
  href?: string
  children?: ReactNode
  className?: string
}

export function SkipLink({
  href = '#main-content',
  children = 'Skip to main content',
  className = '',
}: SkipLinkProps) {
  const skipLinkClass = `govuk-skip-link${className ? ` ${className}` : ''}`

  return (
    <Link href={href} className={skipLinkClass} data-module="govuk-skip-link">
      {children}
    </Link>
  )
}
