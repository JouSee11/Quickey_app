import usb_hid
import storage
from digitalio import DigitalInOut, Direction, Pull
import supervisor

# Disable USB mass storage (drive) to allow writing to filesystem
storage.disable_usb_drive()

# Enable HID and Serial (CDC) only
usb_hid.enable(
    (usb_hid.Device.KEYBOARD, usb_hid.Device.MOUSE, usb_hid.Device.CONSUMER_CONTROL)
)

#set the device name - for the usb interface
#supervisor.set_usb_identification("Quickey", "V1-9K", 1, 1)
usb_hid.set_interface_name("Quickey", "sdf", 0x1234, 0x5678)
