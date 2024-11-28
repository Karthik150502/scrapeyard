'use client'

import CountUp from "react-countup";
import React, { useEffect, useState } from 'react'

export default function CountUpWrapper({ value }: { value: number }) {

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, [])


    if (!mounted) {
        return "--"
    }
    return (
        <CountUp duration={0.5} preserveValue end={value} decimals={0} />
    )
}
