import type { ReactNode } from 'react'
import { Link } from '../Link/Link.js'

export interface BackLinkProps {
  href?: string
  children?: ReactNode
  inverse?: boolean
  onClick?: () => void
  className?: string
}

export function BackLink({
  href,
  children = 'Back',
  inverse = false,
  onClick = () => {},
  className = '',
}: BackLinkProps) {
  const inverseClass = inverse ? ' govuk-back-link--inverse' : ''
  const linkClass = `govuk-back-link${inverseClass}${className ? ` ${className}` : ''}`

  // If href is provided, use it
  if (href) {
    return (
      <Link href={href} className={linkClass} onClick={onClick}>
        {children}
      </Link>
    )
  }

  // Otherwise render as Link with onClick handler
  return (
    <Link
      href="#"
      className={linkClass}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
    >
      {children}
    </Link>
  )
}
