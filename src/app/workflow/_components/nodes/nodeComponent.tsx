import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./nodeCard";
import NodeHeader from "./nodeHeader";
import { AppNodeData } from "@/types/appNodes";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs from "./nodeInputs";
import NodeInput from "./nodeInput";

const NodeComponent = memo((props: NodeProps) => {

    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type]

    return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
        <NodeHeader taskType={nodeData.type} />
        <NodeInputs>
            {task.inputs.map((inp, idx) => {
                return <NodeInput key={idx} input={inp} nodeId={props.id} />
            })}
        </NodeInputs>
    </NodeCard>
})

export default NodeComponent;
NodeComponent.displayName = "NodeComponent"