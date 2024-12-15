import { ExecutionEnvironment } from "@/types/executor";
import { addPropertyToJsonTask } from "../task/addPropertyToJson";

export async function addPropertyToJsonExecutor(
    environment: ExecutionEnvironment<typeof addPropertyToJsonTask>
): Promise<boolean> {
    try {
        const jsonString = environment.getInput("JSON");
        if (!jsonString) {
            environment.log.error("Input -> JSON is not defined.")
        }
        let obj = JSON.parse(jsonString);
        if (obj === undefined) {
            environment.log.error("Not a valid JSON provided.");
            return false;
        }
        const jsonkey = environment.getInput("Property Name");
        if (!jsonkey) {
            environment.log.error("Input -> Property Name is not defined.")
        }
        const jsonValue = environment.getInput("Property Value");
        if (!jsonValue) {
            environment.log.error("Input -> Property Value is not defined.")
        }
        obj[jsonkey] = jsonValue;
        environment.setOutput("Updated JSON", JSON.stringify(obj));
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}