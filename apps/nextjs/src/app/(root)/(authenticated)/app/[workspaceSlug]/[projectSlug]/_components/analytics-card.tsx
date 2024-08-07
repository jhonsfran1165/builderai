import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unprice/ui/card"
import type { Bar } from "@unprice/ui/charts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unprice/ui/tabs"
import { cn } from "@unprice/ui/utils"
import type { ReactNode } from "react"

export function AnalyticsCard<T extends string>({
  tabs,
  defaultTab,
  title,
  description,
  className,
  children,
}: {
  title: string
  className?: string
  description: string
  tabs: {
    id: T
    label: string
    data: Bar<unknown>[]
    limit?: number
  }[]
  defaultTab: T
  children: (props: {
    limit?: number
    tab: T
    data: Bar<unknown>[]
  }) => ReactNode
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab}>
          <TabsList>
            {tabs.map(({ id, label }) => (
              <TabsTrigger key={id} value={id}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* // TODO: add suspense component with prefetch */}
          {tabs.map(({ id, data, limit }) => (
            <TabsContent key={id} value={id}>
              {children({ limit, tab: id, data })}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
