import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unprice/ui/card"
import { Spinner } from "@unprice/ui/icons"

export function LoadingCard(props: {
  title: string
  description: string
  className?: string
}) {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Spinner className="m-6 h-16 w-16 animate-spin" />
      </CardContent>
    </Card>
  )
}
