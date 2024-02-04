"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
} from "@dnd-kit/core"
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { TRPCClientError } from "@trpc/client"
import { createPortal } from "react-dom"

import type {
  FeaturePlan,
  FeatureType,
  Group,
  GroupType,
  PlanConfig,
  PlanVersion,
} from "@builderai/db/schema/price"
import { planConfigSchema } from "@builderai/db/schema/price"
import { Accordion } from "@builderai/ui/accordion"
import { Button } from "@builderai/ui/button"
import { Add } from "@builderai/ui/icons"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@builderai/ui/resizable"
import { ScrollArea } from "@builderai/ui/scroll-area"
import { Separator } from "@builderai/ui/separator"
import { useToast } from "@builderai/ui/use-toast"

import { useDebounce } from "~/lib/use-debounce"
import useLocalStorage from "~/lib/use-local-storage"
import { api } from "~/trpc/client"
import { FeatureCard } from "./feature"
import { FeatureGroup } from "./feature-group"
import { FeatureGroupEmptyPlaceholder } from "./feature-group-placeholder"
import { Features } from "./features"
import { SortableFeature } from "./sortable-feature"

function generateId() {
  // generate a random id
  return Math.random().toString(36).substr(2, 9)
}

export const defaultGroups: Group[] = [
  {
    id: generateId(),
    title: "Base Features",
  },
]

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
}

// TODO: do not pass projectSlug to different components - props hell!!
export default function DragDrop({
  projectSlug,
  version,
}: {
  projectSlug: string
  version: PlanVersion
}) {
  const toaster = useToast()
  const wasBuilt = useRef(false)
  const disabled = version.status === "published"

  // keep track of the changes in localStorage
  const [config, setConfig] = useLocalStorage(
    `config-plan-${projectSlug}`,
    {} as PlanConfig
  )

  // each feature has a group id, which represent the plan groupings you implement
  // example of groups: Base Features, Pay as you go, etc
  const [groups, setGroups] = useState<Group[]>([]) // TODO: design empty state for groups
  // when the drag and drop starts we need to handle the state of the plan
  const [activeFeature, setActiveFeature] = useState<FeaturePlan | null>(null)
  const [clonedFeatures, setClonedFeatures] = useState<FeaturePlan[] | null>(
    null
  )
  // store all the features in the current plan
  const [features, setFeatures] = useState<FeaturePlan[]>([])

  const featuresIds = useMemo(() => {
    return features.map((feature) => feature.id)
  }, [features])

  const groupIds = useMemo(() => groups.map((g) => g.id), [groups])

  const reBuildDragAndDrop = useCallback(
    (config: PlanConfig) => {
      try {
        const groups = Object.keys(config).map((key) => {
          return { id: key, title: config[key]?.name ?? "" } as Group
        })

        setGroups(groups)

        const features = Object.values(config).reduce((acc, group) => {
          return [...acc, ...group.features]
        }, [] as FeaturePlan[])

        setFeatures(features)

        return config
      } catch (error) {
        console.error("error", error)
        setConfig({})
        return {} as PlanConfig
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // store the plan configuration
  // plan_config: { "colum_id": name: "Base Features", features: [Feature1, Feature2] }
  const planConfig = useMemo(() => {
    const plan = features.reduce((acc, feature) => {
      if (!feature.groupId) return acc
      const group = acc[feature.groupId]
      if (group) {
        group.features.push(feature)
      } else {
        acc[feature.groupId] = {
          name: groups.find((g) => g.id === feature.groupId)?.title ?? "",
          features: [feature],
        }
      }
      return acc
    }, {} as PlanConfig)

    return plan
  }, [features, groups])

  const debouncedPlanConfig = useDebounce(planConfig, 600)

  // parse the debouncedConfig to know if it's valid, if so then save it to the db
  const isValidConfig = (plan: PlanConfig) => {
    try {
      if (Object.keys(plan).length === 0) return false
      planConfigSchema.parse(plan)
      return true
    } catch (error) {
      return false
    }
  }

  const updatePlanVersion = api.plan.updateVersion.useMutation({
    onSuccess: () => {
      setConfig({}) // clear the local storage
    },
    onError: (err) => {
      if (err instanceof TRPCClientError) {
        toaster.toast({
          title: err.message,
          variant: "destructive",
        })
      } else {
        toaster.toast({
          title: "Error updating plan",
          variant: "destructive",
          description:
            "An issue occurred while updating the plan. Please try again.",
        })
      }
    },
  })

  useEffect(() => {
    if (!wasBuilt.current) {
      wasBuilt.current = true
      return
    }

    if (Object.keys(config).length !== 0) {
      const mergedConfig = {
        ...version.featuresPlan,
        ...config,
      }

      reBuildDragAndDrop(mergedConfig)
    } else {
      reBuildDragAndDrop(version.featuresPlan ?? {})
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (disabled) return
    if (!wasBuilt.current) return

    const savedData = async () => {
      await updatePlanVersion.mutateAsync({
        projectSlug,
        versionId: version.version,
        planId: version.planId,
        featuresPlan: debouncedPlanConfig,
      })
    }

    const isValid = isValidConfig(debouncedPlanConfig)

    if (!isValid) setConfig(debouncedPlanConfig)
    if (isValid) void savedData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPlanConfig])

  // sensor are the way we can control how the drag and drop works
  // we have some components inside the feature that are interactive like buttons
  // so we need to delay the drag and drop when the user clicks on those buttons
  // otherwise the drag and drop will start when the user clicks on the buttons
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  )

  const onDragCancel = () => {
    if (clonedFeatures) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setClonedFeatures(features)
    }

    setClonedFeatures(null)
  }

  const deleteFeature = (id: string) => {
    const newFeature = features.filter((feature) => feature.id !== id)
    setFeatures(newFeature)
  }

  const updateFeature = (feature: FeaturePlan) => {
    setFeatures((features) => {
      const index = features.findIndex((f) => f.id === feature.id)
      if (index === -1) return features

      features[index] = feature
      return [...features]
    })
  }

  const createNewGroup = () => {
    const groupToAdd: Group = {
      id: generateId(),
      title: `Group ${groups.length + 1}`,
    }

    setGroups([...groups, groupToAdd])
  }

  const deleteGroup = (id: string) => {
    const filteredGroups = groups.filter((g) => g.id !== id)
    setGroups(filteredGroups)

    const newFeature = features.filter((t) => t.groupId !== id)
    setFeatures(newFeature)
  }

  const updateGroup = (id: string, title: string) => {
    const newGroups = groups.map((g) => {
      if (g.id !== id) return g
      return { ...g, title }
    })

    setGroups(newGroups)
  }

  const onDragStart = (event: DragStartEvent) => {
    // just copy the features in case the user cancels the drag
    setClonedFeatures(features)

    if (event.active.data.current?.type === "Feature") {
      setActiveFeature(event.active.data.current.feature as FeaturePlan)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveFeature(null)
    setClonedFeatures(null)

    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    // get string from GroupType
    const isActiveGroup = active.data.current?.type === ("Group" as GroupType)
    if (!isActiveGroup) return

    // For Group we only need to re-order the list
    setGroups((groups) => {
      const activeGroupIndex = groups.findIndex((g) => g.id === activeId)
      const overGroupIndex = groups.findIndex((g) => g.id === overId)

      return arrayMove(groups, activeGroupIndex, overGroupIndex)
    })
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    // only process if there is an over item
    if (!over) return

    // over represents the item that is being dragged over
    // active represents the item that is being dragged
    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const activeData = active.data.current
    const overData = over.data.current

    const isActiveFeature = activeData?.type === ("Feature" as FeatureType)
    const isOverAFeature = overData?.type === ("Feature" as FeatureType)
    const isOverAGroup = overData?.type === ("Group" as GroupType)

    // only process features
    if (!isActiveFeature) return

    // I'm dropping a Feature over another Feature
    // the over feature can be inside a group or not
    if (isActiveFeature && isOverAFeature) {
      const overFeature = overData.feature as FeaturePlan

      // if the over feature has a group id then we don't need to do anything
      // because the over feature is in the search
      if (!overFeature?.groupId) return

      // if the over feature has a group id then we need to move the active feature to the same group
      setFeatures((features) => {
        const activeIndex = features.findIndex((t) => t.id === activeId)
        const overIndex = features.findIndex((t) => t.id === overId)
        const activeFeature = features[activeIndex]
        const overFeature = features[overIndex]

        // if the active feature is in the list
        // and the over feature is in the list
        // and the active feature is not in the same group as the over feature
        // then we need to move the active feature to the same group as the over feature
        if (
          activeFeature &&
          overFeature &&
          activeFeature.groupId !== overFeature.groupId
        ) {
          activeFeature.groupId = overFeature.groupId
          return arrayMove(features, activeIndex, overIndex - 1)
        } else if (!activeFeature && overFeature) {
          // if the active feature is not in the list then we need to add it to the list
          return arrayMove(
            [
              ...features,
              { ...activeData.feature, groupId: overFeature?.groupId },
            ],
            activeIndex,
            overIndex
          ) as FeaturePlan[]
        } else {
          // otherwise we only re-order the list
          return arrayMove(features, activeIndex, overIndex)
        }
      })
    }

    // I'm dropping a Feature over a group
    if (isActiveFeature && isOverAGroup) {
      setFeatures((features) => {
        const activeIndex = features.findIndex((t) => t.id === activeId)
        const activeFeature = features[activeIndex]

        // if the active feature is in the list then we need to move it to the new group
        if (activeFeature) {
          activeFeature.groupId = overId.toString()
          return arrayMove(features, activeIndex, activeIndex)
        } else {
          // if the active feature is not in the list then we need to add it to the list
          return [
            ...features,
            {
              ...activeData.feature,
              groupId: overId,
            },
          ] as FeaturePlan[]
        }
      })
    }
  }

  return (
    <DndContext
      id={"plan-features"}
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragCancel={onDragCancel}
      collisionDetection={pointerWithin}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70} minSize={50}>
          <div className="p-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex w-full flex-col align-middle">
                <h2 className="text-xl font-semibold tracking-tight">
                  Add the features of your plan
                </h2>
                <p className="text-sm text-muted-foreground">
                  Base features of the plan
                </p>
              </div>
              <div className="flex w-full justify-end">
                <Button
                  onClick={() => {
                    createNewGroup()
                  }}
                  variant={"outline"}
                  size={"sm"}
                >
                  <Add className="mr-2 h-4 w-4" />
                  Add feature group
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col p-3">
            <Accordion type="multiple" className="space-y-2">
              <SortableContext
                items={groupIds}
                disabled={version.status === "published"}
                strategy={verticalListSortingStrategy}
              >
                {groups.map((g) => (
                  <FeatureGroup
                    key={g.id}
                    deleteGroup={deleteGroup}
                    updateGroup={updateGroup}
                    group={g}
                  >
                    {!planConfig[g.id]?.features ? (
                      <div className="h-full px-3">
                        <FeatureGroupEmptyPlaceholder />
                      </div>
                    ) : (
                      <ScrollArea className="h-full px-3">
                        <SortableContext
                          disabled={version.status === "published"}
                          items={
                            planConfig[g.id]?.features.map((f) => f.id) ?? []
                          }
                        >
                          <div className="space-y-2">
                            {planConfig[g.id]?.features.map((f) => (
                              <SortableFeature
                                disabled={version.status === "published"}
                                projectSlug={projectSlug}
                                deleteFeature={deleteFeature}
                                updateFeature={updateFeature}
                                key={f.id}
                                feature={f}
                                type="Plan"
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </ScrollArea>
                    )}
                  </FeatureGroup>
                ))}
              </SortableContext>
            </Accordion>
          </div>

          {typeof window !== "undefined" &&
            "document" in window &&
            createPortal(
              <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
                {activeFeature && (
                  <FeatureCard
                    isOverlay
                    feature={activeFeature}
                    projectSlug={projectSlug}
                    type="Feature"
                  />
                )}
              </DragOverlay>,
              document.body
            )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <Features
            selectedFeaturesIds={featuresIds}
            projectSlug={projectSlug}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </DndContext>
  )
}
