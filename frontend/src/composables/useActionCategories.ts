import { ref } from 'vue'

export interface ActionDefinition {
    label: string
    icon: string
    actionCode: string
    requiresInput?: boolean
    inputType?: 'key' | 'text' | 'number' | 'mouse' | 'delay'
}

export interface ActionCategory {
    title: string
    category: string
    actions: ActionDefinition[]
}

export const useActionCategories = () => {
    const categories = ref<ActionCategory[]>([
        {
            title: 'Keys control',
            category: 'keys',
            actions: [
                {
                    label: 'Key Press & Release',
                    icon: 'pi pi-play',
                    actionCode: 'press-release',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Hold',
                    icon: 'pi pi-pause',
                    actionCode: 'hold',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Release',
                    icon: 'pi pi-stop',
                    actionCode: 'release',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Release All',
                    icon: 'pi pi-step-backward',
                    actionCode: 'release-all',
                    requiresInput: false
                }
            ]
        },
        {
            title: 'Mouse control',
            category: 'mouse',
            actions: [
                {
                    label: 'Mouse move',
                    icon: 'pi pi-arrows-alt',
                    actionCode: 'mouse-move',
                    requiresInput: true,
                    inputType: 'mouse'
                },
                {
                    label: 'Mouse click',
                    icon: 'pi pi-external-link',
                    actionCode: 'mouse-click',
                    requiresInput: true,
                    inputType: 'mouse'
                }
            ]
        },
        {
            title: 'Media control',
            category: 'media',
            actions: [
                {
                    label: 'Volume-up',
                    icon: 'pi pi-volume-up',
                    actionCode: 'volume-up',
                    requiresInput: false
                },
                {
                    label: 'Volume-down',
                    icon: 'pi pi-volume-down',
                    actionCode: 'volume-down',
                    requiresInput: false
                },
                {
                    label: 'Volume mute',
                    icon: 'pi pi-volume-off',
                    actionCode: 'volume-mute',
                    requiresInput: false
                },
                {
                    label: 'Play/pause',
                    icon: 'pi pi-play',
                    actionCode: 'play-pause',
                    requiresInput: false
                },
                {
                    label: 'Play next',
                    icon: 'pi pi-step-forward',
                    actionCode: 'play-next',
                    requiresInput: false
                },
                {
                    label: 'Play previous',
                    icon: 'pi pi-step-backward',
                    actionCode: 'play-prev',
                    requiresInput: false
                }
            ]
        },
        {
            title: 'Other actions',
            category: 'other',
            actions: [
                {
                    label: 'Delay',
                    icon: 'pi pi-clock',
                    actionCode: 'delay',
                    requiresInput: true,
                    inputType: 'delay'
                },
                {
                    label: 'Write',
                    icon: 'pi pi-pencil',
                    actionCode: 'write',
                    requiresInput: true,
                    inputType: 'text'
                }
            ]
        }
    ])

    return {
        categories
    }
}