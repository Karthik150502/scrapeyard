
export type Log = {
    message: string,
    level: LogLevel,
    timeStamp: Date
}


export const LogLevels = ["info", "error", "warn"] as const;
export type LogLevel = (typeof LogLevels)[number]

export type LogCollector = {
    getAll(): Log[]
} & {
    [K in LogLevel]: LogFunction
}

export type LogFunction = (message: string) => void;