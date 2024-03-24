import DragDrop from "../../_components/drag-drop"
import { PlanVersionConfigurator } from "../../_components/plan-version-configurator"

export default function OverviewVersionPage({
  params,
}: {
  params: {
    workspaceSlug: string
    projectSlug: string
    planSlug: string
    planVersionId: string
  }
}) {
  const { planSlug, planVersionId } = params

  return (
    <div className="flex flex-col">
      <DragDrop>
        {/* // INFO: if we use jotai in other parts of the app probably this is better placed as a top level provider */}
        <PlanVersionConfigurator
          planSlug={planSlug}
          planVersionId={planVersionId}
        />
      </DragDrop>
    </div>
  )
}
