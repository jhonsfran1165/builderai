import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import NoLinksPlaceholder from "@/components/shared/sites/no-sites-placeholder"
import LinkCardPlaceholder from "@/components/shared/sites/sites-card-placeholder"

export default async function IndexPage() {
  return (
    <>
      <MaxWidthWrapper className="pt-10">
        <ul className="grid grid-cols-1 gap-3">Billing</ul>
      </MaxWidthWrapper>
    </>
  )
}
