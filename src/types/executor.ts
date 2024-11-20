import { Browser } from "puppeteer"
import { WorkFlowTaskType } from "./workflow";

export type Environment = {
    browser?: Browser,
    phases: Record<
        string, //NodeId/TaskId
        {
            inputs: Record<string, string>,
            outputs: Record<string, string>,
        }>
}

export type ExecutionEnvironment<T extends WorkFlowTaskType> = {
    getInput(name: T["inputs"][number]["name"]): string;
}