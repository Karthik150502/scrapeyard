'use client'
import { FlowValidationContext } from "@/components/context/flowValidationContext";
import { useContext } from "react";

export default function useFlowValidation() {
    const context = useContext(FlowValidationContext);
    if (!context) {
        throw new Error("useFlowValidation must be invoked inside FlowValidationContext")
    }
    return context;
}