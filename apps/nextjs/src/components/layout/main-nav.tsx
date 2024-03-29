import Link from "next/link"

import { navItems } from "~/constants/layout"

export function MainNav({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className="hidden items-center space-x-4 lg:flex lg:space-x-6"
      {...props}
    >
      {navItems.map((item, idx) => (
        <Link
          href={item.href}
          key={`${item.href}-${idx}`}
          className="text-sm font-medium transition-colors hover:text-background-textContrast"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
