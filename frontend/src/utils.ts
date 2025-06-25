export function getOS() {
    const userAgent = window.navigator.userAgent

    if (/macOS|Macintosh|MacIntel|MacPPC|Mac68K|darwin/.test(userAgent)) {
        return "macos"
    } else if (/Win32|Win64|Windows|WinCE/.test(userAgent)) {
        return "windows"
    } else if (/Linux/.test(userAgent)) {
        return "linux"
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
        return "ios"
    } else if (/Android/.test(userAgent)) {
        return "android"
    }
}