import type { KnobActionCategory } from "@/types/buttonBindHome"
import {ref} from 'vue'

export const useKnobActionCategories = () => {
    const rotateCategories = ref<KnobActionCategory[]>([
        {
            label: 'Media',
            iconSection: 'material-symbols:audio-file-outline-sharp',
            items: [
                {label: 'Volume up', value: 'volumeUp', icon: 'material-symbols:volume-up'},
                {label: 'Volume down', value: 'volumeDown', icon: 'material-symbols:volume-down'},
                {label: 'Play next', value: 'playNext', icon: 'material-symbols:skip-next'},
                {label: 'Play previous', value: 'playPrev', icon: 'material-symbols:skip-previous'},
            ] 
        },
        {
            label: 'Navigation',
            iconSection: 'material-symbols:map',
            items: [
                {label: 'Scroll up', value: 'scrollUp', icon: 'tabler:arrow-move-up'},
                {label: 'Scroll down', value: 'scrollDown', icon: 'tabler:arrow-move-down'},
                {label: 'Page up', value: 'PageUp', icon: 'ic:round-move-up'},
                {label: 'Page down', value: 'PageDown', icon: 'ic:round-move-down'},
                {label: 'Arrow up', value: 'ArrowUp', icon: 'mdi:arrow-up'},
                {label: 'Arrow down', value: 'ArrowDown', icon: 'mdi:arrow-down'},
            ] 
        },
        {
            label: 'Editing',
            iconSection: 'icon-park-outline:editing',
            items: [
                {label: 'Timeline left', value: 'ArrowLeft', icon: 'mingcute:timeline-fill'},
                {label: 'Timeline right', value: 'ArrowRight', icon: 'mingcute:timeline-fill'},
                {label: 'Brush bigger', value: 'BracketRight', icon: 'streamline-logos:adobe-photoshop-logo-solid'},
                {label: 'Brush smaller', value: 'BracketLeft', icon: 'streamline-logos:adobe-photoshop-logo-solid'},
            ] 
        },
    ])

    const buttonCategories = ref<KnobActionCategory[]>([
        {
            label: 'Media',
            iconSection: 'material-symbols:audio-file-outline-sharp',
            items: [
                {label: 'Volume mute', value: 'volumeMute', icon: 'mdi:mute'},
                {label: 'Play/pause toggle', value: 'playPause', icon: 'f7:playpause-fill'},
                {label: 'Stop', value: 'stop', icon: 'mingcute:stop-fill'},
                {label: 'Play next', value: 'playNext', icon: 'material-symbols:skip-next'},
                {label: 'Play previous', value: 'playPrev', icon: 'material-symbols:skip-previous'},
            ] 
        },
        {
            label: 'Other',
            iconSection: 'tabler:dots',
            items: [
                {label: 'Mouse middle click', value: 'mouseMiddle', icon: 'ph:mouse-middle-click-fill'},

            ] 
        },
    ]) 

    return {
        rotateCategories,
        buttonCategories
    }
}