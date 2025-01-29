// This code runs in the browser and interacts with the Pico via Web Serial API

//html elements
const buttonSend = document.getElementById("submit-button")
const buttonConnect = document.getElementById("connect-button")
const statusMsg = document.getElementById("status-message")
const logArea = document.getElementById("log-area")

let picoPort;
let writer;

function addLogs(textLog) {
    logArea.value += textLog + "\n"
}

async function connectToPico() {
    try {
        picoPort = await navigator.serial.requestPort();
        await picoPort.open({ baudRate: 9600 });
  
        const reader = picoPort.readable.getReader();
        writer = picoPort.writable.getWriter();

    // Read data from the serial port
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
        }
            // Process the data received from the serial port
            addLogs(`[Pico Debug]: ${new TextDecoder().decode(value)}`)
            console.log("[Pico Debug]:", new TextDecoder().decode(value));
        }
  
        writer.releaseLock();
        addLogs(`Connected to Pico and ready to send data`)
        console.log("Connected to Pico and ready to send data");
    } catch (err) {
        addLogs(`Error connecting to serial port: ${err}`)
        console.error("Error connecting to serial port:", err);
    }
}

async function closePort() {
    try {
        if (writer) {
            writer.releaseLock();
        }
        if (picoPort) {
            await picoPort.close();
            addLogs("Serial port closed") 
            console.log("Serial port closed");
        }
    } catch (err) {
        addLogs(`Failed to close port: ${err}`) 
        console.error("Failed to close port:", err);
    }
}

// Close port when the user exits the page
window.addEventListener('beforeunload', async () => {
    await closePort();
});


// Send data to Pico with a newline
async function sendToPico(data) {
    try {
        const dataToSend = data + "\r\n"; // Ensure newline
        await writer.write(new TextEncoder().encode(dataToSend));
    
        addLogs(`Data sent and flushed successfully: ${dataToSend}`)
        console.log("Data sent and flushed:", dataToSend);
    } catch (err) {
        addLogs(`"Failed to send data: ${err}`)
        console.error("Failed to send data:", err);
    }
  }


// Example usage for sending data
async function saveKeys(dataToSend) {
  try {
    const dataWrite = JSON.stringify(dataToSend);
    await sendToPico(dataWrite);
  } catch (err) {
    addLogs(`Failed to send data: ${err}`)
    console.error("Failed to send data:", err);
  }
}

// Trigger the connection and data sending on page load or an event
buttonConnect.addEventListener("click", connectToPico);
document.getElementById("submit-button").addEventListener("click", () => {
    const dataToSend = {}
    keyBindingValues.forEach((value, key) => {
        dataToSend[key] = Array.from(value)
    })
    saveKeys(dataToSend);
});
