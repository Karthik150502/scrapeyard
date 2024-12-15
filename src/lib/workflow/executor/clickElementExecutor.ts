import { ExecutionEnvironment } from "@/types/executor";
import { clickElementTask } from "../task/clickElement";

export async function clickElementExecutor(
    environment: ExecutionEnvironment<typeof clickElementTask>
): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Input -> selector is not defined.")
        }
        await environment.getPage()!.click(selector);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}