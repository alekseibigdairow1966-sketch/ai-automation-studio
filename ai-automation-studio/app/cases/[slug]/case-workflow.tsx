"use client"

import { WorkflowDiagram } from "@/components/workflow-diagram"

interface CaseWorkflowProps {
  nodes: { id: string; label: string; icon: string; x: number; y: number }[]
  edges: { from: string; to: string; label?: string }[]
}

export function CaseWorkflow({ nodes, edges }: CaseWorkflowProps) {
  return <WorkflowDiagram nodes={nodes} edges={edges} />
}
