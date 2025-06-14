import { ref } from 'vue'
import type { ActionDefinition, ActionCategory } from '@/types/buttonBindHome'

export const useActionCategories = () => {
    const categories = ref<ActionCategory[]>([
        {
            title: 'Keys control',
            category: 'keys',
            actions: [
                {
                    label: 'Key Press & Release',
                    icon: 'pepicons-pop:down-up',
                    actionCode: 'press-release',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Hold',
                    icon: 'fa6-solid:down-long',
                    actionCode: 'hold',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Release',
                    icon: 'fa6-solid:up-long',
                    actionCode: 'release',
                    requiresInput: true,
                    inputType: 'key'
                },
                {
                    label: 'Key Release All',
                    icon: 'line-md:chevron-small-triple-up',
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
                    icon: 'mdi:mouse-move-vertical',
                    actionCode: 'mouse-move',
                    requiresInput: true,
                    inputType: 'mouse'
                },
                {
                    label: 'Mouse click',
                    icon: 'mdi:mouse-left-click',
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
                    icon: 'material-symbols:volume-up-rounded',
                    actionCode: 'volume-up',
                    requiresInput: false
                },
                {
                    label: 'Volume-down',
                    icon: 'material-symbols:volume-down-rounded',
                    actionCode: 'volume-down',
                    requiresInput: false
                },
                {
                    label: 'Volume mute',
                    icon: 'mingcute:volume-mute-fill',
                    actionCode: 'volume-mute',
                    requiresInput: false
                },
                {
                    label: 'Play/pause toggle',
                    icon: 'f7:playpause-fill',
                    actionCode: 'play-pause',
                    requiresInput: false
                },
                {
                    label: 'Play next',
                    icon: 'mage:next-fill',
                    actionCode: 'play-next',
                    requiresInput: false
                },
                {
                    label: 'Play previous',
                    icon: 'mage:previous-fill',
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
                    icon: 'mingcute:time-fill',
                    actionCode: 'delay',
                    requiresInput: true,
                    inputType: 'delay'
                },
                {
                    label: 'Write',
                    icon: 'material-symbols:keyboard-rounded',
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