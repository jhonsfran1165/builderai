import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "./utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "button-primary bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "button-danger bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "button-default border border-input",
        secondary:
          "button-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "button-ghost bg-transparent",
        link: "button-link text-primary hover:underline-none focus-visible:ring-none focus-visible:ring-ring focus-visible:ring-offset-none",
        custom:
          "hover:underline-none focus-visible:ring-offset-none focus-visible:ring-none focus-visible:ring-offset-0 focus-visible:ring-0",
      },
      size: {
        default: "h-9 rounded-md px-3",
        sm: "h-8 rounded-md px-3",
        normal: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
