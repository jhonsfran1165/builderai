
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className="flex grow flex-col">{children}</main>
  )
}
