"use client"

import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react"

// Single KPI card in the demo dashboard with sample inputs
export default function KpiCard({ visits }) {
  return (
    <Card className="mx-auto max-w-lg">
      <Flex alignItems="start">
        <div>
          <Text>Visits</Text>
          <Metric> {visits}</Metric>
        </div>
        <BadgeDelta className="primary" deltaType="moderateIncrease">
          13.2%
        </BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">68% ($ 149,940)</Text>
        <Text>$ 220,500</Text>
      </Flex>
      <ProgressBar value={15.9} className="mt-2" />
    </Card>
  )
}
