import {defineStore } from 'pinia'
import {ref, computed, readonly} from 'vue'

export const useDeviceStore = defineStore('device', () => {
    // ========================================
    // STATE
    // ========================================
    const isConnected = ref<boolean>(false)
    const connectionStatus = ref<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')
    const deviceInfo = ref<{
        name: string,
        port?: any
    } | null>(null)
    const lastError = ref<string>('')

    //serial communication variables
    const devicePort = ref<any>(null)
    const writer = ref<any>(null)
    const reader = ref<any>(null)
    const serialBuffer = ref<string>('')

    // ========================================
    // GETTERS
    // ========================================
    const canCommunicateWithDevice = computed(() => 
        isConnected.value && connectionStatus.value === 'connected'
    )

    const statusText = computed(() => {
        const statusMap = {
            connecting: 'Connecting...',
            connected: `Connected`,
            error: `Error: ${lastError.value}`,
            disconnected: `Disconnected`
        }
        return statusMap[connectionStatus.value]
    })

    // ========================================
    // PRIVATE HELPERS FUNCTIONS
    // ========================================
    const checkWebSerialSupport = (): boolean => {
        if (!('serial' in navigator)) {
            setError('Web serial API is not supported by your browser')
            return false
        }
        return true
    }

    const setError = (message: string): void => {
        lastError.value = message
        connectionStatus.value = 'error'
        console.error(`[Device Store] ${message}`)
    }

    const resetState = () : void => {
        isConnected.value = false
        connectionStatus.value = 'disconnected'
        deviceInfo.value = null
        lastError.value = ''
        serialBuffer.value = ''
    }

    //function to clean up all resources before disconnect
    const cleanupResources = async (): Promise<void> => {
        try{
            if (writer.value) {
                await writer.value.close()
                writer.value.releaseLock()
                writer.value = null
            }
            if (reader.value) {
                await reader.value.cancel()
                reader.value.releaseLock()
                reader.value = null
            }
            if (devicePort.value) {
                await devicePort.value.close()
                devicePort.value = null
            }
        } catch (error: any) {
            console.log(`Resources cleanup error: ${error}`);
        }
    }

    //start reading the serial data
    const startReadingSerial = async (): Promise<void> => {
        if (!reader.value) return

        try {
            while (isConnected.value && reader.value) {
                const {value, done} = await reader.value.read()

                if (done) {
                    reader.value.releaseLock()
                    break
                }

                const chunk = new TextDecoder().decode(value)
                serialBuffer.value += chunk

                if (serialBuffer.value.includes('\n')) {
                    // TODO: add it to the log area
                    console.log(`[Device debug]: ${serialBuffer.value}`);
                    
                    //if we recpgnise the import from the device (printing from the device starts with _import_)
                    if (serialBuffer.value.startsWith('_import_')) {
                        // handleImportData(serialBuffer.value)
                    }

                    //reset the serial buffer value after the whole message
                    serialBuffer.value = ''
                }
            }
        } catch (error: any) {
            setError(`Reading error ${error.message}`)
        }
    }

    //TODO: actually make it work
    const handleImportData = (data: string): JSON | null => {
        try {
            const jsonData = JSON.parse(data.substring(8))
            console.log("Imported data:", jsonData);
            return jsonData
        } catch (error) {
            setError('Failed to parse import data')
            return null
        }
    }

    // ========================================
    // PUBLIC ACTIONS
    // ========================================
    const connect = async(): Promise<boolean> => {
        if (!checkWebSerialSupport()) return false

        connectionStatus.value = 'connecting'

        try{
            //request port selection from user
            devicePort.value = await (navigator as any).serial.requestPort()
            await devicePort.value.open({ baudRate: 9600 })
            
            //setup readers/writers
            reader.value = devicePort.value.readable.getReader()
            writer.value = devicePort.value.writable.getWriter()

            //update state
            isConnected.value = true
            connectionStatus.value = 'connected'
            lastError.value = ''

            deviceInfo.value = {
                name: 'Quick Key Controller v1',
                port: devicePort.value
            }

            //start reading from the connected serial
            startReadingSerial()

            console.log("Device connected successfully");
            return true            
        } catch (error: any) {
            setError(error.message || 'Failed to connnect to device')
            isConnected.value = false
            return false
        }
    }

    const disconnect = async (): Promise<void> => {
        try {
            await cleanupResources()
            resetState()
            console.log("Device disconnected successfully");
        } catch (error: any) {
            setError(`Failed to disconnect: ${error.message}`)
        }
    }

    const sendToDevice = async (data: any): Promise<boolean> => {
        if (!writer.value || !isConnected.value) {
            //action shouldnt be possible to call when device is not connected 
            throw new Error('device not connected') 
        }

        try {
            const jsonString = JSON.stringify(data)
            const encoder = new TextEncoder()
            await writer.value.write(encoder.encode(jsonString + '\n'))

            console.log(`Data send: ${jsonString}`);
            return true
        } catch (error: any) {
            setError(`Failed to send data: ${error.message}`)
            throw error
        }
    }

    //TODO - probably doesnt work
    const importFromDevice = async (): Promise<any> => {
        if (!canCommunicateWithDevice.value) {
            throw new Error('Cannot import - device not connected')
        }

        try {
            // Send import command to device
            await sendToDevice({ command: 'import' })
        
            // Return promise that resolves when import data is received
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                reject(new Error('Import timeout'))
                }, 5000)

                // Listen for import data (you might need to implement this differently)
                // This is a simplified version
                setTimeout(() => {
                clearTimeout(timeout)
                resolve({ imported: true })
                }, 1000)
            })
        } catch (error: any) {
            setError(`Import failed: ${error.message}`)
            throw error
        }
    }

    // Handle page unload
    const handlePageUnload = (): void => {
        if (isConnected.value) {
            disconnect()
        }
    }

    // ========================================
    // RETURN API
    // ========================================
    return {
        // State (readonly)
        isConnected: readonly(isConnected),
        connectionStatus: readonly(connectionStatus),
        deviceInfo: readonly(deviceInfo),
        lastError: readonly(lastError),
        
    
        // Getters
        statusText,
        canCommunicateWithDevice,
        
        // Actions
        connect,
        disconnect,
        sendToDevice,
        importFromDevice,
        handlePageUnload,
    
        // For debugging (optional)
        // debug: {
        //     picoPort: readonly(picoPort),
        //     serialBuffer: readonly(serialBuffer)
        // }
    }


})