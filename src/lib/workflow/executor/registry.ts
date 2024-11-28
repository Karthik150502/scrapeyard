
import { TaskType } from "@/types/task"
import { extractTextFromElementExecutor } from "./extractTextFromElementExecutor"
import { launchBrowserExecutor } from "./launchBrowserExecutor"
import { pageToHtmlExecutor } from "./pageToHtmlExecutor"
import { ExecutionEnvironment } from "@/types/executor"
import { WorkFlowTaskType } from "@/types/workflow"




type ExecutorFunctionType<T extends WorkFlowTaskType> = (env: ExecutionEnvironment<T>) => Promise<boolean>;


type RegistryType = {
    [K in TaskType]: ExecutorFunctionType<WorkFlowTaskType & { type: K }>
}

export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: launchBrowserExecutor,
    PAGE_TO_HTML: pageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: extractTextFromElementExecutor,
}




