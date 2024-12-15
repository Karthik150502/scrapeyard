import { ExecutionEnvironment } from "@/types/executor";
import { scrollToElementTask } from "../task/scrollToElement";

export async function scrollToElementExecutor(
    environment: ExecutionEnvironment<typeof scrollToElementTask>
): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Input -> selector is not defined.")
        }
        await environment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error("Element not found");
            }
            const top = element.getBoundingClientRect().top + window.screenY;
            window.scrollTo({ top });
        }, selector);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}