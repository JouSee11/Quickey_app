import time
import board
import digitalio
import usb_hid
import storage  # For filesystem control
import supervisor
import sys
#from adafruit_hid.keyboard import Keyboard
#from adafruit_hid.keycode import Keycode

#from key_code_conversion import JS_TO_ADAFRUIT_HID
from globals import keyboard, mouse
import globals
from read_save_data import *

# Initialize the onboard LED
led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

#buttons functionality

time_sleep = 0.2

# Initialize buttons (same as before)
btn1 = digitalio.DigitalInOut(board.GP13)
btn1.direction = digitalio.Direction.INPUT
btn1.pull = digitalio.Pull.UP

btn2 = digitalio.DigitalInOut(board.GP10)
btn2.direction = digitalio.Direction.INPUT
btn2.pull = digitalio.Pull.UP

btn3 = digitalio.DigitalInOut(board.GP7)
btn3.direction = digitalio.Direction.INPUT
btn3.pull = digitalio.Pull.UP

btn4 = digitalio.DigitalInOut(board.GP14)
btn4.direction = digitalio.Direction.INPUT
btn4.pull = digitalio.Pull.UP

btn5 = digitalio.DigitalInOut(board.GP11)
btn5.direction = digitalio.Direction.INPUT
btn5.pull = digitalio.Pull.UP

btn6 = digitalio.DigitalInOut(board.GP8)
btn6.direction = digitalio.Direction.INPUT
btn6.pull = digitalio.Pull.UP

btn7 = digitalio.DigitalInOut(board.GP15)
btn7.direction = digitalio.Direction.INPUT
btn7.pull = digitalio.Pull.UP

btn8 = digitalio.DigitalInOut(board.GP12)
btn8.direction = digitalio.Direction.INPUT
btn8.pull = digitalio.Pull.UP

btn9 = digitalio.DigitalInOut(board.GP9)
btn9.direction = digitalio.Direction.INPUT
btn9.pull = digitalio.Pull.UP


print_data("Pico is running. Press buttons or send data over serial.")

while True:
    try:
        # Check for incoming serial data
        if supervisor.runtime.serial_bytes_available:
            data = sys.stdin.readline().strip()
            if data: # if any data are send
                if (data == "import data"):
                    export_data_to_browser()
                else:
                    save_data(data)  # Save to filesystem
                    supervisor.reload() # reload the device when we save the data to it
        
        if not btn1.value and not btn2.value:
            print("mode change")
            time.sleep(time_sleep)
        
        # Check button presses and send HID keycodes
        if not btn1.value:
            handle_key_press(1)
            time.sleep(time_sleep)

        if not btn2.value:
            handle_key_press(2)
            time.sleep(time_sleep)

        if not btn3.value:
            handle_key_press(3)
            time.sleep(time_sleep)


        if not btn4.value:
            handle_key_press(4)
            time.sleep(time_sleep)

        if not btn5.value:
            handle_key_press(5)
            time.sleep(time_sleep)

        if not btn6.value:
            handle_key_press(6)
            time.sleep(time_sleep)

        if not btn7.value:
            handle_key_press(7)
            time.sleep(time_sleep)

        if not btn8.value:
            handle_key_press(8)
            time.sleep(time_sleep)

        if not btn9.value:
            handle_key_press(9)
            time.sleep(time_sleep)        

        time.sleep(0.01)  # Short delay for stability

    except Exception as e:
        print_data(f"Error: {e}")
        time.sleep(1)
        
        
        

