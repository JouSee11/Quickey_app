export type ButtonState = "binded" | "notBinded"

export interface ButtonBindHome {
    id: number,
    text: string,
    state: ButtonState
}