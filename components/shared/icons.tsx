import {
  Cog, CreditCard, File,
  FileText, HelpCircle, Image, LucideProps, Settings, Trash, Trello, Users, type Icon as LucideIcon
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  cog: Cog,
  billing: CreditCard,
  trello: Trello,
  users: Users,
  help: HelpCircle,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
    </svg>
  ),
}
