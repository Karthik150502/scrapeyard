"use client"

import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";


export default function DeletableEdge(props: EdgeProps) {

    const [edgePath, labelX, laeblY] = getSmoothStepPath(props);
    const { setEdges } = useReactFlow();

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${laeblY}px)`,
                        pointerEvents: "all"
                    }}
                >
                    <Button variant={"outline"} className="h-8 w-6 cursor-pointer rounded-full flex items-center justify-center"
                        onClick={() => {
                            setEdges((edges) => edges.filter(edge => edge.id !== props.id))
                        }}
                    ><X /></Button>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}