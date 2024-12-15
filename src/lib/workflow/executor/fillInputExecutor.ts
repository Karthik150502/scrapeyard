import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/fillInput";
import { waitFor } from "@/lib/waitFor";

export async function fillInputExecutor(
    environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {

    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Input -> selector is not defined.")
        }
        const value = environment.getInput("Value");
        if (!value) {
            environment.log.error("Input -> value is not defined.")
        }
        await environment.getPage()!.type(selector, value);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}