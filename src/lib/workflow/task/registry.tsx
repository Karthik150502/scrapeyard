import { TaskType } from "@/types/task";
import { ExtractTextFromElement } from "./extractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHTMLTask } from "./pageToHtml";
import { WorkFlowTaskType } from "@/types/workflow";



type RegistryType = {
    [K in TaskType]: WorkFlowTaskType & {
        type: K
    }
}
export const TaskRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHTMLTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement
};















