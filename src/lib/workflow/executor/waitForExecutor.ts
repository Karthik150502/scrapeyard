import { ExecutionEnvironment } from "@/types/executor";
import { waitForElementTask } from "../task/waitForElement";

export async function waitForExecutor(
    environment: ExecutionEnvironment<typeof waitForElementTask>
): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Input -> selector is not defined.")
        }
        const visibility = environment.getInput("Visibility");
        if (!visibility) {
            environment.log.error("Input -> visibility is not defined.")
        }

        await environment.getPage()!.waitForSelector(selector, {
            visible: visibility === "visible",
            hidden: visibility === "hidden",
        });
        environment.log.info(`Element ${selector} became: ${visibility}`)
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}