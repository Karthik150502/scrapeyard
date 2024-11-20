'use client'
import { FlowToExecutionErrorType, flowToExecutionPlan, FlowToExecutionValidationError } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./use-flow-validation";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback((error: FlowToExecutionErrorType) => {
    switch (error.type) {
      case FlowToExecutionValidationError.NO_ENTRY_POINT: {
        toast.error("No entry point found")
        break;
      }
      case FlowToExecutionValidationError.INVALID_INPUTS: {
        toast.error("Not all input values are set.");
        setInvalidInputs(error.invalidElements!);
        break;
      }
      default: {
        break;
      }
    }
  }, [setInvalidInputs])

  const generateExecutePlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const { executionPlan, error } = flowToExecutionPlan(nodes as AppNode[], edges);
    if (error) {
      handleError(error);
      return null;
    }
    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors])
  return generateExecutePlan;
}








export default useExecutionPlan;