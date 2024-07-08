import type { LucideProps } from "lucide-react"
import {
  Activity,
  AlertTriangle,
  Building,
  ClipboardCheck,
  Command,
  CreditCard,
  HelpCircle,
  Loader2,
  MoreVertical,
  Plus,
  SunMedium,
} from "lucide-react"

import { cn } from "./utils"

export {
  Activity,
  AppWindow,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BarChart2,
  BarChartIcon,
  BotIcon,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  CheckCircleIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Circle,
  Component,
  Copy,
  CreditCard,
  CrossIcon,
  Database,
  DollarSign,
  DollarSignIcon,
  Edit,
  Eye,
  EyeOff,
  FileStack,
  Github,
  Globe,
  HelpCircle,
  Key,
  LayoutGrid,
  LogOut,
  MessageCircleQuestion,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  PlusCircle,
  Receipt,
  ReceiptIcon,
  Search,
  Settings,
  SlidersHorizontal,
  Smile,
  StopCircle,
  Trash2,
  User,
  User2,
  Users,
  XCircle,
} from "lucide-react"

// TODO: ???
// import { DotsHorizontalIcon } from "@radix-ui/react-icons"
export type { LucideIcon } from "lucide-react"

export type Icon = (props: LucideProps) => JSX.Element

export const Logo = Command
export const Dashboard = Activity
export const Spinner = Loader2
export const Billing = CreditCard
export const Ellipsis = MoreVertical
export const Organization = Building
export const Add = Plus
export const Warning = AlertTriangle
export const Help = HelpCircle
export const CopyDone = ClipboardCheck
export const Sun = SunMedium

export const System: Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497z"
      fillRule="nonzero"
      fill="currentColor"
    />
  </svg>
)

export const Mdx: Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57.97"
    height="24"
    viewBox="0 0 512 212"
    {...props}
  >
    <path
      fill="currentColor"
      d="m272.696 40.203l-.002 84.896l31.185-31.178l15.74 15.741l-57.642 57.638l-58.369-58.369l15.741-15.741l31.085 31.085l.001-84.072zM72.162 162.979V97.232l40.255 40.257l40.56-40.557v65.383h22.261V43.192l-62.82 62.816l-62.517-62.521v119.492z"
    />
    <path
      fill="#F9AC00"
      d="m447.847 36.651l15.74 15.741l-47.149 47.147l45.699 45.701l-15.741 15.741l-45.7-45.699l-45.701 45.699l-15.74-15.741l45.695-45.701l-47.146-47.147l15.74-15.741l47.152 47.146z"
    />
  </svg>
)

export const NextAuth: Icon = (_props) => (
  <svg
    width="198"
    height="40"
    viewBox="0 0 198 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="c-PJLV c-PJLV-isACLx-size-md c-PJLV-fVifuS-color-text1 c-PJLV-iKRiRH-css"
  >
    <path
      d="M2.19982 4.93108C7.12219 3.48247 14.8007 1.19222 17.6658 0.336887C18.4038 0.11655 19.1839 0.113541 19.9231 0.329834C22.674 1.1347 29.8907 3.25502 35.2778 4.91661C36.1138 5.17444 36.6837 5.96756 36.6672 6.84218C36.1772 32.8488 22.8852 38.7254 19.5482 39.7925C19.0548 39.9502 18.5334 39.9508 18.0396 39.7944C14.6876 38.7329 1.28346 32.8688 0.780184 6.87028C0.762994 5.98225 1.34776 5.18184 2.19982 4.93108Z"
      fill="#D9D9D9"
    />
    <mask id="mask0_12256_81203" maskUnits="userSpaceOnUse" x="0" y="0" width="37" height="40">
      <path
        d="M2.19982 4.93108C7.12219 3.48247 14.8007 1.19222 17.6658 0.336887C18.4038 0.11655 19.1839 0.113541 19.9231 0.329834C22.674 1.1347 29.8907 3.25502 35.2778 4.91661C36.1138 5.17444 36.6837 5.96756 36.6672 6.84218C36.1772 32.8488 22.8852 38.7254 19.5482 39.7925C19.0548 39.9502 18.5334 39.9508 18.0396 39.7944C14.6876 38.7329 1.28346 32.8688 0.780184 6.87028C0.762994 5.98225 1.34776 5.18184 2.19982 4.93108Z"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_12256_81203)">
      <path
        d="M18.7934 19.4366L18.5117 -0.704224L37.8075 4.50704L18.7934 19.4366Z"
        fill="#818181"
      />
      <path
        d="M18.7935 19.4366V0L0.342829 4.92958L-2.19238 16.9014L5.83579 29.4366L18.7935 19.4366Z"
        fill="#8D8D8D"
      />
      <path d="M37.2438 4.92957L5.55371 29.4366V40.5634H36.8213L37.2438 4.92957Z" fill="#A4A4A4" />
    </g>
    <path
      d="M66.1058 9.90909V31H63.1811L52.4606 15.532H52.2649V31H49.0827V9.90909H52.0281L62.7589 25.3977H62.9545V9.90909H66.1058ZM76.1581 31.3192C74.5996 31.3192 73.2574 30.9863 72.1315 30.3203C71.0124 29.6475 70.1473 28.7035 69.5363 27.4883C68.9321 26.2662 68.63 24.8348 68.63 23.1939C68.63 21.5736 68.9321 20.1456 69.5363 18.9098C70.1473 17.674 70.9986 16.7094 72.0903 16.016C73.1888 15.3226 74.4726 14.9759 75.9418 14.9759C76.8343 14.9759 77.6994 15.1235 78.537 15.4187C79.3746 15.7139 80.1264 16.1773 80.7923 16.8089C81.4583 17.4406 81.9835 18.261 82.368 19.2702C82.7524 20.2726 82.9447 21.4912 82.9447 22.9261V24.0178H70.3705V21.7109H79.9273C79.9273 20.9008 79.7625 20.1834 79.433 19.5586C79.1034 18.927 78.64 18.4292 78.0427 18.0653C77.4522 17.7015 76.7588 17.5195 75.9624 17.5195C75.0974 17.5195 74.3422 17.7324 73.6968 18.158C73.0583 18.5768 72.564 19.1261 72.2138 19.8058C71.8706 20.4786 71.6989 21.2098 71.6989 21.9993V23.8015C71.6989 24.8588 71.8843 25.7582 72.255 26.4996C72.6326 27.2411 73.1579 27.8075 73.8307 28.1989C74.5035 28.5833 75.2896 28.7756 76.189 28.7756C76.7726 28.7756 77.3046 28.6932 77.7852 28.5284C78.2658 28.3568 78.6812 28.1027 79.0313 27.7663C79.3815 27.4299 79.6492 27.0146 79.8346 26.5202L82.749 27.0455C82.5156 27.9036 82.0968 28.6554 81.4926 29.3008C80.8953 29.9393 80.1435 30.437 79.2373 30.794C78.3379 31.1442 77.3115 31.3192 76.1581 31.3192ZM87.2634 15.1818L90.7545 21.3402L94.2765 15.1818H97.644L92.7112 23.0909L97.6852 31H94.3177L90.7545 25.0888L87.2016 31H83.8237L88.7463 23.0909L83.8855 15.1818H87.2634ZM107.03 15.1818V17.6534H98.3892V15.1818H107.03ZM100.706 11.392H103.786V26.3555C103.786 26.9528 103.875 27.4025 104.053 27.7045C104.232 27.9998 104.462 28.2023 104.743 28.3121C105.032 28.4151 105.344 28.4666 105.68 28.4666C105.928 28.4666 106.144 28.4495 106.329 28.4151C106.515 28.3808 106.659 28.3533 106.762 28.3327L107.318 30.8764C107.139 30.9451 106.885 31.0137 106.556 31.0824C106.226 31.1579 105.814 31.1991 105.32 31.206C104.51 31.2197 103.755 31.0755 103.054 30.7734C102.354 30.4714 101.788 30.0045 101.355 29.3729C100.923 28.7412 100.706 27.9483 100.706 26.994V11.392ZM111.304 31H107.927L115.516 9.90909H119.193L126.783 31H123.405L117.442 13.7401H117.277L111.304 31ZM111.871 22.7408H122.828V25.4183H111.871V22.7408ZM138.442 24.44V15.1818H141.531V31H138.503V28.2607H138.339C137.975 29.1051 137.391 29.8088 136.588 30.3718C135.791 30.9279 134.799 31.206 133.612 31.206C132.596 31.206 131.696 30.9828 130.914 30.5366C130.138 30.0835 129.527 29.4141 129.08 28.5284C128.641 27.6428 128.421 26.5477 128.421 25.2433V15.1818H131.501V24.8725C131.501 25.9504 131.799 26.8086 132.396 27.4471C132.994 28.0856 133.77 28.4048 134.724 28.4048C135.301 28.4048 135.874 28.2607 136.444 27.9723C137.02 27.6839 137.498 27.248 137.875 26.6644C138.26 26.0808 138.448 25.3394 138.442 24.44ZM151.892 15.1818V17.6534H143.252V15.1818H151.892ZM145.569 11.392H148.648V26.3555C148.648 26.9528 148.738 27.4025 148.916 27.7045C149.095 27.9998 149.325 28.2023 149.606 28.3121C149.894 28.4151 150.207 28.4666 150.543 28.4666C150.79 28.4666 151.007 28.4495 151.192 28.4151C151.377 28.3808 151.522 28.3533 151.625 28.3327L152.181 30.8764C152.002 30.9451 151.748 31.0137 151.419 31.0824C151.089 31.1579 150.677 31.1991 150.183 31.206C149.373 31.2197 148.617 31.0755 147.917 30.7734C147.217 30.4714 146.65 30.0045 146.218 29.3729C145.785 28.7412 145.569 27.9483 145.569 26.994V11.392ZM157.557 21.608V31H154.478V9.90909H157.516V17.7564H157.712C158.083 16.9051 158.649 16.2288 159.411 15.7276C160.173 15.2264 161.169 14.9759 162.398 14.9759C163.482 14.9759 164.43 15.199 165.24 15.6452C166.057 16.0915 166.689 16.7575 167.135 17.6431C167.588 18.5219 167.815 19.6204 167.815 20.9386V31H164.735V21.3093C164.735 20.149 164.437 19.2496 163.839 18.6112C163.242 17.9658 162.411 17.6431 161.347 17.6431C160.619 17.6431 159.967 17.7976 159.391 18.1065C158.821 18.4155 158.371 18.8686 158.041 19.4659C157.719 20.0563 157.557 20.7704 157.557 21.608ZM172.792 31.1957C172.229 31.1957 171.745 30.9966 171.34 30.5984C170.935 30.1933 170.733 29.7058 170.733 29.136C170.733 28.573 170.935 28.0924 171.34 27.6942C171.745 27.2892 172.229 27.0866 172.792 27.0866C173.355 27.0866 173.839 27.2892 174.244 27.6942C174.649 28.0924 174.852 28.573 174.852 29.136C174.852 29.5136 174.756 29.8603 174.564 30.1761C174.378 30.4851 174.131 30.7322 173.822 30.9176C173.513 31.103 173.17 31.1957 172.792 31.1957ZM177.816 15.1818H180.896V32.0298C180.896 33.0871 180.703 33.9796 180.319 34.7074C179.941 35.4351 179.378 35.9878 178.63 36.3654C177.889 36.743 176.972 36.9318 175.88 36.9318C175.771 36.9318 175.668 36.9318 175.571 36.9318C175.468 36.9318 175.362 36.9284 175.252 36.9215V34.2749C175.348 34.2749 175.434 34.2749 175.51 34.2749C175.578 34.2749 175.657 34.2749 175.747 34.2749C176.474 34.2749 176.999 34.0792 177.322 33.6879C177.652 33.3034 177.816 32.7438 177.816 32.0092V15.1818ZM179.341 12.7411C178.805 12.7411 178.345 12.5626 177.961 12.2056C177.583 11.8417 177.394 11.4092 177.394 10.908C177.394 10.4 177.583 9.96745 177.961 9.61044C178.345 9.24657 178.805 9.06463 179.341 9.06463C179.876 9.06463 180.333 9.24657 180.71 9.61044C181.095 9.96745 181.287 10.4 181.287 10.908C181.287 11.4092 181.095 11.8417 180.71 12.2056C180.333 12.5626 179.876 12.7411 179.341 12.7411ZM195.731 19.0437L192.941 19.538C192.824 19.181 192.639 18.8411 192.385 18.5185C192.137 18.1958 191.801 17.9315 191.375 17.7255C190.95 17.5195 190.418 17.4165 189.779 17.4165C188.907 17.4165 188.179 17.6122 187.596 18.0036C187.012 18.388 186.72 18.8858 186.72 19.4968C186.72 20.0254 186.916 20.4511 187.307 20.7738C187.699 21.0965 188.33 21.3608 189.202 21.5668L191.715 22.1435C193.171 22.4799 194.255 22.9982 194.969 23.6985C195.683 24.3988 196.04 25.3085 196.04 26.4276C196.04 27.375 195.766 28.2195 195.217 28.9609C194.674 29.6955 193.916 30.2723 192.941 30.6911C191.973 31.1098 190.85 31.3192 189.573 31.3192C187.802 31.3192 186.357 30.9416 185.238 30.1864C184.118 29.4244 183.432 28.343 183.178 26.9425L186.154 26.4893C186.339 27.2652 186.72 27.8522 187.297 28.2504C187.874 28.6417 188.626 28.8374 189.553 28.8374C190.562 28.8374 191.368 28.628 191.973 28.2092C192.577 27.7835 192.879 27.2652 192.879 26.6541C192.879 26.1598 192.693 25.7444 192.323 25.408C191.959 25.0716 191.399 24.8176 190.644 24.646L187.967 24.0589C186.49 23.7225 185.399 23.187 184.692 22.4524C183.991 21.7178 183.641 20.7875 183.641 19.6616C183.641 18.7279 183.902 17.9109 184.424 17.2106C184.946 16.5103 185.667 15.9645 186.587 15.5732C187.507 15.175 188.56 14.9759 189.748 14.9759C191.458 14.9759 192.803 15.3466 193.785 16.0881C194.767 16.8227 195.416 17.8079 195.731 19.0437Z"
      fill="#A4A4A4"
    />
  </svg>
)

export const CheckIcon: Icon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const TRPC: Icon = (props) => (
  <svg
    width="512"
    height="512"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="512" height="512" rx="150" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-background"
      d="M255.446 75L326.523 116.008V138.556L412.554 188.238V273.224L435.631 286.546V368.608L364.6 409.615L333.065 391.378L256.392 435.646L180.178 391.634L149.085 409.615L78.0538 368.538V286.546L100.231 273.743V188.238L184.415 139.638L184.462 139.636V116.008L255.446 75ZM326.523 159.879V198.023L255.492 239.031L184.462 198.023V160.936L184.415 160.938L118.692 198.9V263.084L149.085 245.538L220.115 286.546V368.538L198.626 380.965L256.392 414.323L314.618 380.712L293.569 368.538V286.546L364.6 245.538L394.092 262.565V198.9L326.523 159.879ZM312.031 357.969V307.915L355.369 332.931V382.985L312.031 357.969ZM417.169 307.846L373.831 332.862V382.985L417.169 357.9V307.846ZM96.5154 357.9V307.846L139.854 332.862V382.915L96.5154 357.9ZM201.654 307.846L158.315 332.862V382.915L201.654 357.9V307.846ZM321.262 291.923L364.6 266.908L407.938 291.923L364.6 316.962L321.262 291.923ZM149.085 266.838L105.746 291.923L149.085 316.892L192.423 291.923L149.085 266.838ZM202.923 187.362V137.308L246.215 162.346V212.377L202.923 187.362ZM308.015 137.308L264.723 162.346V212.354L308.015 187.362V137.308ZM212.154 121.338L255.446 96.3231L298.785 121.338L255.446 146.354L212.154 121.338Z"
    />
  </svg>
)

export const GitHub: Icon = (props) => (
  <svg viewBox="0 0 438.549 438.549" {...props}>
    <path
      fill="currentColor"
      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
    />
  </svg>
)

export const React: Icon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
    />
  </svg>
)

export const Nextjs: Icon = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"
    />
  </svg>
)

export const Drizzle: Icon = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z"
    />
  </svg>
)

export const StripeLinkLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn("fill-current", className)}
    height="32"
    width="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#bi_link__a)">
      <path fill="#33DDB3" d="M0 0h32v32H0z" />
      <path
        d="M7.978 10.172a1.023 1.023 0 1 1 1.136 1.7 1.023 1.023 0 0 1-1.136-1.7ZM4 10.109h1.829v11.063H4V10.109Zm24.725 3.165a26.691 26.691 0 0 1-2.234 3.895L29 21.166h-2.16L25.298 18.7c-1.55 1.766-3.084 2.63-4.563 2.63-1.802 0-2.539-1.288-2.539-2.754 0-.349.005-.778.005-1.047 0-1.932-.204-2.476-.856-2.392-1.253.168-3.156 3.022-4.395 6.03h-1.72v-7.893h1.828v3.949c1.043-1.76 1.997-3.268 3.535-3.85.895-.34 1.647-.191 2.04-.018 1.417.625 1.415 2.151 1.396 4.197-.005.27-.005.56-.005.869 0 .741.205 1.067.71 1.117.3.026.602-.041.864-.191v-9.238h1.828v7.917s1.585-1.45 3.261-4.752h2.038Zm-19.265.004H7.633v7.895h1.829v-7.895H9.46Z"
        fill="#1D3944"
      />
    </g>
    <defs>
      <clipPath id="bi_link__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
)

export const Kysely: Icon = (props) => (
  <svg
    width="132"
    height="132"
    viewBox="0 0 132 132"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_8_3)">
      <rect x="2" y="2" width="128" height="128" rx="16" fill="white" />
      <path
        d="M41.2983 109V23.9091H46.4918V73.31H47.0735L91.9457 23.9091H98.8427L61.9062 64.1694L98.5103 109H92.0288L58.5824 67.9087L46.4918 81.2873V109H41.2983Z"
        fill="black"
      />
    </g>
    <rect x="2" y="2" width="128" height="128" rx="16" stroke="#121212" strokeWidth="4" />
    <defs>
      <clipPath id="clip0_8_3">
        <rect x="2" y="2" width="128" height="128" rx="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const Tailwind: Icon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
)

export const Google: Icon = (props) => (
  <svg role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
  </svg>
)



export const Youtube: Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
)

export const Twitter: Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
)