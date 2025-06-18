from adafruit_hid.keyboard import Keyboard
from adafruit_hid.mouse import Mouse
from adafruit_hid.consumer_control import ConsumerControl
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
import usb_hid


#for the leds
import board
import digitalio

for device in usb_hid.devices:
    print(f"Usage Page: {hex(device.usage_page)}, Usage ID: {hex(device.usage)}")

# Shared variables
keyboard = Keyboard(usb_hid.devices)
mouse = Mouse(usb_hid.devices)
consumer = ConsumerControl(usb_hid.devices)

keyboardLayout = KeyboardLayoutUS(keyboard)
btn_keys = None  # Will be initialized later
page_num = 0

#board elements
led_list = None

#firmware info
FIRMWARE_VERSON = ''
DEVICE_NAME = ''

# Initialize LEDS
# Initialize LEDS
# led0 = digitalio.DigitalInOut(board.GP11)
# led0.direction = digitalio.Direction.OUTPUT

# led1 = digitalio.DigitalInOut(board.GP10)
# led1.direction = digitalio.Direction.OUTPUT

# led2 = digitalio.DigitalInOut(board.GP9)
# led2.direction = digitalio.Direction.OUTPUT

# led_list = [led0, led1, led2]
