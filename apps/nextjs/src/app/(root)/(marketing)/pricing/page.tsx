import { toDecimal } from "dinero.js"
import { Balancer } from "react-wrap-balancer"

import type { RouterOutputs } from "@builderai/api"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@builderai/ui/card"
import { CheckCircle2 } from "@builderai/ui/icons"

import { currencySymbol } from "@builderai/db/validators"

import { api } from "~/trpc/server"
import { SubscribeNow } from "./subscribe-now"

export default async function PricingPage() {
  const plans = await api.stripe.plans()

  return (
    <main className="flex w-full flex-col items-center justify-center pt-16">
      <div className="z-10 min-h-[50vh] w-full max-w-7xl px-5 xl:px-0">
        <h1 className="text-7xl/[5rem]">Pricing</h1>
        <Balancer className="text-2xl">
          Simple pricing for all your needs. No hidden fees, no surprises.
        </Balancer>

        <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard key={plan.priceId} plan={plan} />
          ))}
        </div>
      </div>
    </main>
  )
}

function PricingCard(props: {
  plan: RouterOutputs["stripe"]["plans"][number]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.plan.name}</CardTitle>
        <div className="text-2xl font-bold">
          {toDecimal(
            props.plan.price,
            ({ value, currency }) => `${currencySymbol(currency.code)}${value}`
          )}
          <span className="text-base font-normal"> / month</span>
        </div>{" "}
        <CardDescription>{props.plan.description}</CardDescription>
      </CardHeader>

      <ul className="flex flex-col px-6 pb-6">
        {props.plan.preFeatures && (
          <li className="flex items-center pb-1">{props.plan.preFeatures}</li>
        )}
        {props.plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckCircle2 className="fill-primary text-primary-foreground mr-2 h-6 w-6" />
            {feature}
          </li>
        ))}
      </ul>

      <CardFooter>
        <SubscribeNow planId={props.plan.priceId} />
      </CardFooter>
    </Card>
  )
}
