import { AuthenticationContainer } from "@/components/auth/auth-container"
import { RegisterForm } from "@/components/auth/register-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | builderAI",
  description: "Register page for builderAI.",
}

export default function RegisterPage() {
  return (
    <AuthenticationContainer
      linkUrl={"/login"}
      linkText={"login"}
    >
      <RegisterForm />
    </AuthenticationContainer>
  )
}
