
import { extractTextFromElementExecutor } from "./extractTextFromElementExecutor"
import { launchBrowserExecutor } from "./lauchBrowserExecutor"
import { pageToHtmlExecutor } from "./pageToHtmlExecutor"



export const ExecutorRegistry = {
    LAUNCH_BROWSER: launchBrowserExecutor,
    PAGE_TO_HTML: pageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: extractTextFromElementExecutor,
}




