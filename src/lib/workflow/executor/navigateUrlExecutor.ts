import { ExecutionEnvironment } from "@/types/executor";
import { navigateUrlTask } from "../task/navigateUrlTask";

export async function navigateUrlExecutor(
    environment: ExecutionEnvironment<typeof navigateUrlTask>
): Promise<boolean> {
    try {
        const url = environment.getInput("URL");
        if (!url) {
            environment.log.error("Input -> url is not defined.")
        }
        await environment.getPage()!.goto(url);
        environment.log.info(`Visited the url ${url}`);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}