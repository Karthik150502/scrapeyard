import { ExecutionEnvironment } from "@/types/executor";
import { readPropertyFromJsonTask } from "../task/readPropertyFromJson";

export async function readPropertyFromJsonExecutor(
    environment: ExecutionEnvironment<typeof readPropertyFromJsonTask>
): Promise<boolean> {
    try {
        const jsonString = environment.getInput("JSON");
        if (!jsonString) {
            environment.log.error("Input -> JSON is not defined.")
        }
        const jsonkey = environment.getInput("Property Name");
        if (!jsonkey) {
            environment.log.error("Input -> Property Name is not defined.")
        }
        let obj = JSON.parse(jsonString);
        let res = obj[jsonkey];
        if (res === undefined) {
            environment.log.error("Property not found.");
            return false;
        }
        environment.setOutput("Property Value", res);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}