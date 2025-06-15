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
                    actionCode: 'pressRelease',
                    requiresInput: true,
                    // inputType: 'key'
                },
                {
                    label: 'Key Hold',
                    icon: 'fa6-solid:down-long',
                    actionCode: 'hold',
                    requiresInput: true,
                    // inputType: 'key'
                },
                {
                    label: 'Key Release',
                    icon: 'fa6-solid:up-long',
                    actionCode: 'release',
                    requiresInput: true,
                    // inputType: 'key'
                },
                {
                    label: 'Key Release All',
                    icon: 'line-md:chevron-small-triple-up',
                    actionCode: 'releaseAll',
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
                    actionCode: 'mouseMove',
                    requiresInput: true,
                    // inputType: 'mouse'
                },
                {
                    label: 'Mouse click',
                    icon: 'mdi:mouse-left-click',
                    actionCode: 'mouseClick',
                    requiresInput: true,
                    // inputType: 'mouse'
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
                    actionCode: 'volumeUp',
                    requiresInput: false
                },
                {
                    label: 'Volume-down',
                    icon: 'material-symbols:volume-down-rounded',
                    actionCode: 'volumeDown',
                    requiresInput: false
                },
                {
                    label: 'Volume mute',
                    icon: 'mingcute:volume-mute-fill',
                    actionCode: 'volumeMute',
                    requiresInput: false
                },
                {
                    label: 'Play/pause toggle',
                    icon: 'f7:playpause-fill',
                    actionCode: 'playPause',
                    requiresInput: false
                },
                {
                    label: 'Play next',
                    icon: 'mage:next-fill',
                    actionCode: 'playNext',
                    requiresInput: false
                },
                {
                    label: 'Play previous',
                    icon: 'mage:previous-fill',
                    actionCode: 'playPrev',
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
                    // inputType: 'delay'
                },
                {
                    label: 'Write',
                    icon: 'material-symbols:keyboard-rounded',
                    actionCode: 'write',
                    requiresInput: true,
                    // inputType: 'text'
                }
            ]
        }
    ])

    return {
        categories
    }
}