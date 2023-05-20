import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BlurImage from "@/components/shared/blur-image"
// TODO: add empty state
import { EmptyState } from "@/components/shared/empty-state"
import { Pricing } from "@/components/shared/pricing"

export default function NoProjectsPlaceholder() {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-base-text z-10 text-xl font-semibold">
          {"You don't have any projects yet!"}
        </h2>
        <BlurImage
          src="/_static/illustrations/call-waiting.svg"
          alt="No links yet"
          width={400}
          height={400}
          priority={true}
          className="pointer-events-none -my-8"
        />
      </div>
      <CardFooter className="flex items-center justify-center">
        <Button className="button-primary w-80">Create a new project</Button>
      </CardFooter>
    </Card>
  )
}
