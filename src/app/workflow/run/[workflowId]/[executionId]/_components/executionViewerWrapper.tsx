import { getWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhase";
import ExecutionViewer from "./executionViewer";


export async function ExecutionViewerWrapper({ executionId }: { executionId: string }) {


    const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

    if (!workflowExecution) {
        return <div>Workflow not found.</div>
    }
    return <ExecutionViewer initialData={workflowExecution} />
}


