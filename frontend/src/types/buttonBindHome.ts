export type ButtonState = "binded" | "notBinded" | "listening" | "multiBinding"

export interface ButtonBindHome {
    id: number,
    text: string,
    state: ButtonState,
    value: string[]
}

export interface KnobBindHome {
    state: "binded" | "notBinded"
    value: string[]
}