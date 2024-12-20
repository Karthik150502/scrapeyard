'use client'
import React from 'react'
import { motion } from "framer-motion";
export default function BlurtextAnimation({ children, size }: { children: string, size: number }) {
    return (
        <div className='text-center w-full mx-auto
    '>
            <p className='dark:text-white text-black bg-clip-text bg-gradient-to-bl from-purple-950 via-purple-600 to-purple-300 w-full'
                style={{
                    fontSize: size + 'px',
                }}
            >

                {
                    children.split(" ").map((word, idx) => {
                        return <motion.span
                            key={idx}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            {word}{" "}
                        </motion.span>
                    })
                }
            </p>
        </div>
    )
}
