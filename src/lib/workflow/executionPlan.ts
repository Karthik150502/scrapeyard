import { AppNode } from "@/types/appNode";
import { WorkflowExecutionPlanPhaseType, WorkflowExecutionPlanType } from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";


type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlanType
}

export function flowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {

    const entryPoint = nodes.find((n) => TaskRegistry[n.data.type].isEntryPoint);


    if (!entryPoint) {
        throw new Error("Entry point not found.")
    }


    let plannedNodes = new Set<string>([entryPoint.id]);
    const executionPlan: WorkflowExecutionPlanType = [
        {
            phase: 1,
            nodes: [entryPoint]
        }
    ];

    let N = nodes.length
    for (let phase = 2;
        phase <= N && plannedNodes.size < N;
        phase++) {

        const nextPhase: WorkflowExecutionPlanPhaseType = {
            phase,
            nodes: [],
        }

        for (const currentNode of nodes) {
            if (plannedNodes.has(currentNode.id)) {
                // Node already planned;
                continue;
            }

            const inValidInputs = getInvalidInputs(currentNode, edges, plannedNodes);

            if (inValidInputs.length > 0) {
                // Getting the incoming nodes to the currentNode
                const incomers = getIncomers(currentNode, nodes, edges);
                if (incomers.every(incomer => plannedNodes.has(incomer.id))) {
                    // If all incomers/edges are planned, and there is an invalid input, that means we have an invalid workflow.
                    console.log("Invalid inputs = ", currentNode.id, inValidInputs);
                    throw new Error("Invalid input found.");
                } else {
                    continue;
                }
            }
            nextPhase.nodes.push(currentNode);
        }
        for (let node of nextPhase.nodes) {
            plannedNodes.add(node.id);
        }
        executionPlan.push(nextPhase);
    }

    return {
        executionPlan
    }
}


function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {

    const invalidInputs: string[] = []

    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name];
        const valueProvided = inputValue?.length > 0;
        if (valueProvided) {
            // Input is valid;
            continue;
        } else {
            // If a value is not provided by the user then we need to check if there are any output edges connected to this input.
            const incomingEdges = edges.filter(e => e.target === node.id);

            // Finding that edge that provides the output to the input.
            const incomingOutputToInput = incomingEdges.find(edge => edge.targetHandle === input.name);


            // Checking if;
            // The input is required;
            // There is an incoming edge to the input
            // And checking if the incoming edge's node has been already planned.
            const reuiredInputProvidedByVisitedOutput = input.required && incomingOutputToInput && planned.has(incomingOutputToInput.source);

            if (reuiredInputProvidedByVisitedOutput) {
                // The input is required, and there is a output conenected to the input, and the node from which the input is comming is already planned.
                continue;
            } else if (!input.required) {
                // If the input is not required but there is an output linked to it, we need to verify if the output node is planned.
                if (!incomingOutputToInput) { continue };
                if (incomingOutputToInput && planned.has(incomingOutputToInput.source)) {
                    continue
                }
            }


            invalidInputs.push(input.name);
        }
    }

    return invalidInputs;
}