"use client"

import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

// TODO: use this for a landing https://www.npmjs.com/package/aos
export default function Page() {
  return (
    <MaxWidthWrapper className="pb-10">
      <h1 className="mt-5 font-satoshi text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
        This is the Site
      </h1>
    </MaxWidthWrapper>
  )
}
