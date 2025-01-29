// import { SerialPort } from "serialport"

// const picoPort = new SerialPort({
//     path: "COM3",
//     baudRate: 9600
// })

// // debug connection
// picoPort.on("open", () => {console.log("Serial port connected")})
// picoPort.on("error", (err) => console.log("Error: " + err.message))

// // Listen for debug messages from the Pico
// picoPort.on("data", (data) => {
//   console.log("[Pico Debug]:", data.toString());
// });

// // Close the serial port
// const closePort = () => {
//   return new Promise((resolve, reject) => {
//     picoPort.close((err) => {
//       if (err) {
//         console.error("Failed to close port:", err);
//         reject(err);
//       } else {
//         console.log("Serial port closed");
//         resolve();
//       }
//     });
//   });
// };

// //Close port when application exits
// process.on("SIGINT", async () => {
//   try {
//     await closePort();
//     console.log("Application exited cleanly.");
//     process.exit();
//   } catch (err) {
//     console.error("Error closing port:", err);
//     process.exit(1);
//   }
// });

// // Send data to Pico with a newline
// const sendToPico = (data) => {
//   return new Promise((resolve, reject) => {
//     const dataToSend = data + "\r\n"; // Ensure newline
//     picoPort.write(Buffer.from(dataToSend, "utf-8"), (err) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       picoPort.drain(() => {
//         console.log("Data sent and flushed:", dataToSend);
//         resolve();
//       });
//     });

//     // Timeout to ensure connection is freed
//     setTimeout(() => {
//       picoPort.pause();
//     }, 200); // Adjust timeout if needed
//   });
// };
  
//   // Example usage in your route handler
//   const saveKeys = async (req, res) => {
//     try {
//       const dataWrite = JSON.stringify(req.body)
//       await sendToPico(dataWrite)
//       //await closePort() // close the conection
//       res.status(200).json({ success: true });
//     } catch (err) {
//       res.status(500).json({ error: "Failed to send data" });
//     }
//   };
  
// export {saveKeys}