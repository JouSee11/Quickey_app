import { onMounted, onUnmounted, ref } from "vue"

export function useScreenSize() {
    const maxScreenWidth = 800
    // const screenWidth = ref(window.innerWidth)
    const isSupported = ref(window.innerWidth >= maxScreenWidth)

    const updateScreenSize = () => {
        isSupported.value = window.innerWidth >= maxScreenWidth
    }

    onMounted(() => {
        window.addEventListener("resize", updateScreenSize)
    })

    onUnmounted(() => {
        window.removeEventListener("resize", updateScreenSize)
    })

    return {
        isSupported
    }
}