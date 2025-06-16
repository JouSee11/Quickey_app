import usb_hid
import storage
from digitalio import DigitalInOut, Direction, Pull

# Disable USB mass storage (drive) to allow writing to filesystem
#storage.disable_usb_drive()

# Enable HID and Serial (CDC) only
usb_hid.enable(
    (usb_hid.Device.KEYBOARD, usb_hid.Device.MOUSE, usb_hid.Device.CONSUMER_CONTROL)
)
