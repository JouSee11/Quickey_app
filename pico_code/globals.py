from adafruit_hid.keyboard import Keyboard
from adafruit_hid.mouse import Mouse
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
import usb_hid

# Shared variables
keyboard = Keyboard(usb_hid.devices)
mouse = Mouse(usb_hid.devices)
keyboardLayout = KeyboardLayoutUS(keyboard)
btn_keys = None  # Will be initialized later