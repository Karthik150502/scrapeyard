import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./nodeCard";
import NodeHeader from "./nodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs from "./nodeInputs";
import NodeInput from "./nodeInput";
import NodeOutputs from "./nodeOutputs";
import NodeOutput from "./nodeOutput";
import { IS_DEV_MODE } from "@/lib/env.config";
import { Badge } from "@/components/ui/badge";





const NodeComponent = memo((props: NodeProps) => {

    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type]

    return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
        {IS_DEV_MODE && (
            <Badge className="flex items-center justify-center">Dev: {props.id}</Badge>
        )}
        <NodeHeader taskType={nodeData.type} nodeId={props.id} />
        <NodeInputs>
            {task.inputs.map((inp: any, idx: number) => {
                return <NodeInput key={idx} input={inp} nodeId={props.id} />
            })}
        </NodeInputs>

        <NodeOutputs>
            {task.outputs.map((out: any, idx: number) => {
                return <NodeOutput key={idx} output={out} />
            })}
        </NodeOutputs>
    </NodeCard>
})

export default NodeComponent;
NodeComponent.displayName = "NodeComponent"