"use client"

import type { ButtonProps } from "@unprice/ui/button"
import { Button } from "@unprice/ui/button"
import { LoadingAnimation } from "@unprice/ui/loading-animation"
import { cn } from "@unprice/ui/utils"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean
  isDisabled?: boolean
  label: string
  component?: "default" | "spinner"
}

export const SubmitButton = ({
  variant = "primary",
  isSubmitting,
  isDisabled,
  label,
  onClick,
  className,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  const isPending = pending || isSubmitting

  return (
    <Button
      variant={variant}
      type={onClick ? "button" : "submit"}
      disabled={isDisabled || pending}
      className={className}
      onClick={onClick}
      {...props}
    >
      {label}
      {isPending && <LoadingAnimation className={cn("ml-2", className)} />}
    </Button>
  )
}
