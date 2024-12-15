import { TaskType } from "@/types/task";
import { ExtractTextFromElement } from "./extractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHTMLTask } from "./pageToHtml";
import { WorkFlowTaskType } from "@/types/workflow";
import { FillInputTask } from "./fillInput";
import { clickElementTask } from "./clickElement";
import { waitForElementTask } from "./waitForElement";
import { DeliverViaWebhookTask } from "./deliverViaWebhook";
import { extractDataWithAiTask } from "./extractDataWithAi";
import { readPropertyFromJsonTask } from "./readPropertyFromJson";
import { addPropertyToJsonTask } from "./addPropertyToJson";
import { navigateUrlTask } from "./navigateUrlTask";
import { extractWholePageDataTask } from "./extractWholePageDataWithAI";
import { scrollToElementTask } from "./scrollToElement";

type RegistryType = {
    [K in TaskType]: WorkFlowTaskType & {
        type: K
    }
}
export const TaskRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHTMLTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: clickElementTask,
    WAIT_FOR_ELEMENT: waitForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
    EXTRACT_DATA_WITH_AI: extractDataWithAiTask,
    READ_PROPERTY_FROM_JSON: readPropertyFromJsonTask,
    ADD_PROPERTY_TO_JSON: addPropertyToJsonTask,
    NAVIGATE_URL: navigateUrlTask,
    GET_ALL_PAGE_CONTENT: extractWholePageDataTask,
    SCROLL_TO_ELEMENT: scrollToElementTask
};















