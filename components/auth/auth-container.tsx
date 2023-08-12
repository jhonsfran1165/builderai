import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import BlurImage from "@/components/shared/blur-image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AuthenticationContainer({
  children,
  linkUrl,
  linkText,
}: {
  children: React.ReactNode
  linkUrl: string
  linkText: string
}) {

  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={`${linkUrl}`}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        {linkText}
      </Link>
      <div className="hidden h-full flex-col bg-muted p-10 lg:flex">
        <BlurImage
          src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="Builderai logo"
          width={800}
          height={800}
          className="absolute left-0 top-0 h-screen w-1/2 object-cover"
        />
        <div className="absolute z-20 flex items-center text-lg font-medium">
          <Logo className="h-10 w-auto text-2xl text-primary" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This application has saved me countless hours of work and
              helped me deliver stunning AI saas applications to my clients faster than ever
              before. Highly recommended!&rdquo;
            </p>
            <footer className="text-sm">Sofia Francis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
