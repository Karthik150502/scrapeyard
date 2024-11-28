import { ExecutionEnvironment } from "@/types/executor";
import { PageToHTMLTask } from "../task/pageToHtml";

export async function pageToHtmlExecutor(
    environment: ExecutionEnvironment<typeof PageToHTMLTask>
): Promise<boolean> {

    try {
        const html = await environment.getPage()!.content();
        environment.setOutput("Html", html);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}