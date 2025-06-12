import { ref } from 'vue'

export interface ActionDefinition {
    label: string
    icon: string
    actionType: string
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
                    actionType: 'press-release',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Hold',
                    icon: 'pi pi-pause',
                    actionType: 'hold',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Release',
                    icon: 'pi pi-stop',
                    actionType: 'release',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Release All',
                    icon: 'pi pi-step-backward',
                    actionType: 'release-all',
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
                    actionType: 'mouse-move',
                    requiresInput: true,
                    inputType: 'mouse'
                },
                {
                    label: 'Mouse click',
                    icon: 'pi pi-external-link',
                    actionType: 'mouse-click',
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
                    actionType: 'volume-up',
                    requiresInput: false
                },
                {
                    label: 'Volume-down',
                    icon: 'pi pi-volume-down',
                    actionType: 'volume-down',
                    requiresInput: false
                },
                {
                    label: 'Volume mute',
                    icon: 'pi pi-volume-off',
                    actionType: 'volume-mute',
                    requiresInput: false
                },
                {
                    label: 'Play/pause',
                    icon: 'pi pi-play',
                    actionType: 'play-pause',
                    requiresInput: false
                },
                {
                    label: 'Play next',
                    icon: 'pi pi-step-forward',
                    actionType: 'play-next',
                    requiresInput: false
                },
                {
                    label: 'Play previous',
                    icon: 'pi pi-step-backward',
                    actionType: 'play-prev',
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
                    actionType: 'delay',
                    requiresInput: true,
                    inputType: 'delay'
                },
                {
                    label: 'Write',
                    icon: 'pi pi-pencil',
                    actionType: 'write',
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