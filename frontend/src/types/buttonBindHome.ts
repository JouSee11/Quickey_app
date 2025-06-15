export type ButtonState = "binded" | "notBinded" | "listening" | "multiBinding"

export interface ButtonBindHome {
    id: number,
    text: string,
    state: ButtonState,
    value: string[]
}

export interface KnobBindHome {
    state: "binded" | "notBinded"
    values: string[]
}

export interface MultiBindingAction {
    id: string,
    actionCode: string
    label: string
    icon: string
    value: string
    requiresInput: boolean
    // inputType?: 'key' | 'text' | 'number' | 'mouse' | 'delay'
}

export interface ActionDefinition {
    label: string
    icon: string
    actionCode: string
    requiresInput: boolean
    // inputType?: 'key' | 'text' | 'number' | 'mouse' | 'delay'
}

export interface ActionCategory {
    title: string
    category: string
    actions: ActionDefinition[]
}

export interface MultiBindingSaveHome {
    actionCode: string,
    actionValue: string
}

// custom multi binding action blocks
export interface ActionNodeProps{
    actionElement: MultiBindingAction,
    index: number
}

export interface ActionNodeEmits{
    remove: [index: number]
}

