"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { useSupabase } from "@/components/auth/supabase-provider"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
  authRegisterValidationSchema,
  type authRegisterValidationType
} from "@/lib/validations/auth"


export function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { supabase } = useSupabase()

  const form = useForm<authRegisterValidationType>({
    resolver: zodResolver(authRegisterValidationSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit: SubmitHandler<authRegisterValidationType> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // TODO: implement onboarding flow
      router.push("/org?action=welcome")
    } catch (error) {
      toast({
        title: "Register error",
        description: error.message,
        className: "danger",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign up to your account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below
        </p>
      </div>
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMAIL</FormLabel>

              <FormControl>
                <Input
                  placeholder="name@example.com"
                  {...field}

                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PASSWORD</FormLabel>

              <FormControl>
                <Input
                  {...field}

                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PASSWORD</FormLabel>

              <FormControl>
                <Input
                  {...field}

                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          form="register-form"
          type="submit"
          variant={"default"}
          className="text-primary-foreground font-semibold"
        >
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up with Email
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background-base text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="button-ghost"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true)
          await supabase.auth.signInWithOAuth({
            provider: "github",
          })
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>

    </Form >
  )
}
