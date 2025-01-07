export interface IHeader {
    statusCount: StatusCount,
    severityCount: SeverityCount
}

export interface ICriticity {
    origin: number,
    critical: number,
    high: number,
    medium: number,
    low: number,
    info: number,
}

export interface ICount {
    value: number,
    month: string
}

interface StatusCount {
    pending: number,
    leaks: number,
    accepted: number,
    fixed: number,
    retest: number,
    reopened: number,
}

interface SeverityCount {
    critical: number,
    info: number,
    high: number,
    medium: number,
    low: number,
}