"use client"

import { use } from "react"
import {
  Card,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from "@tremor/react"

import { AreaChartTest } from "@/components/analytics/testing-tremor"

import MaxWidthWrapper from "../shared/max-width-wrapper"
import ChartView from "./chart"
import KPIS from "./kpis"

export default function DashboardExample({ fetchData }) {
  const { data } = use(fetchData)
  const visits = data[0].visits

  return (
    <MaxWidthWrapper className="pt-10">
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              {/* Placeholder to set height */}
              <KPIS visits={visits}></KPIS>
            </Grid>
            <div className="mt-6">
              <Card>
                <ChartView></ChartView>
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <AreaChartTest />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </MaxWidthWrapper>
  )
}
