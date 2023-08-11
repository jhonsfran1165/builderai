import { ChevronDown, Plus, Star } from "lucide-react"
import Link from "next/link"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import type { DataProjectsView } from "@/lib/types/supabase"
import { timeAgo } from "@/lib/utils"

// TODO: create fully test stripe process with https://docs.webhookthing.com/
export function ProjectCard({ project }: { project: DataProjectsView }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle>{project.project_slug}</CardTitle>
        </div>
        <div className="flex items-center justify-end rounded-md border">
          <Link
            href={`/org/${project.org_slug}/project/${project.project_slug}`}
          >
            <Button variant={"ghost"} className="button-ghost px-2">
              <Icons.externalLink className="text-primary h-4 w-4" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="button-ghost px-2">
                <ChevronDown className="text-primary h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Future Ideas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" /> Create List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{project.project_description}</p>
        <div className="text-muted-foreground mt-5 flex space-x-4 text-sm">
          <div className="flex items-center">
            <Icons.cloud className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {project.project_subdomain}
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3" />
            10k
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end text-xs">
        <div className="text-muted-foreground flex space-x-4 text-sm">
          <div className="flex items-center text-xs font-light">
            Created{" "}
            {project?.project_created_at &&
              timeAgo(new Date(project?.project_created_at))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
