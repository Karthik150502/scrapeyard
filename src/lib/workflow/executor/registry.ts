
import { TaskType } from "@/types/task"
import { extractTextFromElementExecutor } from "./extractTextFromElementExecutor"
import { launchBrowserExecutor } from "./launchBrowserExecutor"
import { pageToHtmlExecutor } from "./pageToHtmlExecutor"
import { ExecutionEnvironment } from "@/types/executor"
import { WorkFlowTaskType } from "@/types/workflow"
import { fillInputExecutor } from "./fillInputExecutor"
import { clickElementExecutor } from "./clickElementExecutor"
import { waitForExecutor } from "./waitForExecutor"
import { deliverViaWebhookExecutor } from "./deliverViaWebhook"
import { extractDataWithAiExecutor } from "./extractDataWithAiExecutor"
import { readPropertyFromJsonExecutor } from "./readPropertyFromJson"
import { addPropertyToJsonExecutor } from "./addPropertyToJson"
import { navigateUrlExecutor } from "./navigateUrlExecutor"
import { extractWholePageDataWithAiExecutor } from "./extractWholePageDataAiExecutor"
import { scrollToElementExecutor } from "./scrollToElementExecutor"

type ExecutorFunctionType<T extends WorkFlowTaskType> = (env: ExecutionEnvironment<T>) => Promise<boolean>;

type RegistryType = {
    [K in TaskType]: ExecutorFunctionType<WorkFlowTaskType & { type: K }>
}

export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: launchBrowserExecutor,
    PAGE_TO_HTML: pageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: extractTextFromElementExecutor,
    FILL_INPUT: fillInputExecutor,
    CLICK_ELEMENT: clickElementExecutor,
    WAIT_FOR_ELEMENT: waitForExecutor,
    DELIVER_VIA_WEBHOOK: deliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI: extractDataWithAiExecutor,
    READ_PROPERTY_FROM_JSON: readPropertyFromJsonExecutor,
    ADD_PROPERTY_TO_JSON: addPropertyToJsonExecutor,
    NAVIGATE_URL: navigateUrlExecutor,
    GET_ALL_PAGE_CONTENT: extractWholePageDataWithAiExecutor,
    SCROLL_TO_ELEMENT: scrollToElementExecutor
}




