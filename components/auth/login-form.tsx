"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { fetchAPI } from "@/lib/utils"
import {
  authLoginValidationSchema,
  type authLoginValidationType
} from "@/lib/validations/auth"
import { Github, Loader2 } from "lucide-react"


export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<authLoginValidationType>({
    resolver: zodResolver(authLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<authLoginValidationType> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true)

      const { error } = await fetchAPI({
        url: "/api/auth/login",
        method: "POST",
        data: {
          email,
          password,
          provider: "email"
        },
      })

      if (error) throw error

      router.push("/")
    } catch (error) {
      console.log(error)
      toast({
        title: "Login error",
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
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below
        </p>
      </div>
      <form
        id="login-form"
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
                  type="password"
                  placeholder="password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          form="login-form"
          type="submit"
          variant={"default"}
          className="font-semibold text-primary-foreground"
        >
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In with Email
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background-base px-2 text-muted-foreground">
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
          const { data, error } = await fetchAPI({
            url: "/api/auth/provider/github",
            data: {},
            method: "POST",
          })

          if (!error) {
            window.location.href = data?.url
          }
        }}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </Form>
  )
}
