import { Metadata } from "next"

import { AuthenticationContainer } from "@/components/auth/auth-container"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | builderAI",
  description: "Login page for builderAI.",
}

export default function LoginPage() {
  return (
    <AuthenticationContainer
      linkUrl={"/register"}
      linkText={"register"}
    >
      <LoginForm />
    </AuthenticationContainer>
  )
}
