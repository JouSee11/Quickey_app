import { SerialPort } from 'serialport';
SerialPort.list().then(ports => {
    ports.forEach(port => {
        console.log(`Port: ${port.path}`);
        console.log(`Manufacturer: ${port.manufacturer}`);
        console.log(`Serial Number: ${port.serialNumber}`);
        console.log(`Vendor ID: ${port.vendorId}`);
        console.log(`Product ID: ${port.productId}`);
        console.log('-------------------------');
    });
}).catch(err => {
    console.error('Error listing ports:', err);
});
