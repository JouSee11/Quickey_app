export type ButtonState = "binded" | "notBinded" | "listening" | "multiBinding"

export interface ButtonBindHome {
    id: number,
    text: string,
    state: ButtonState,
    value: string[]
}