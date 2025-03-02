import time
import board
import digitalio
import usb_hid
import storage  # For filesystem control
import supervisor
import sys

from globals import keyboard, mouse, page_num, led0, led1, led2
import globals
from light_control import *
from read_save_data import *

time_sleep = 0.2

#show the start animation and switch to current page
start_light()
show_led_num(page_num)

page_switch = digitalio.DigitalInOut(board.GP9)
page_switch.direction = digitalio.Direction.INPUT
page_switch.pull = digitalio.Pull.UP


# Initialize buttons (same as before)
btn1 = digitalio.DigitalInOut(board.GP0)
btn1.direction = digitalio.Direction.INPUT
btn1.pull = digitalio.Pull.UP

btn2 = digitalio.DigitalInOut(board.GP1)
btn2.direction = digitalio.Direction.INPUT
btn2.pull = digitalio.Pull.UP

btn3 = digitalio.DigitalInOut(board.GP2)
btn3.direction = digitalio.Direction.INPUT
btn3.pull = digitalio.Pull.UP

btn4 = digitalio.DigitalInOut(board.GP3)
btn4.direction = digitalio.Direction.INPUT
btn4.pull = digitalio.Pull.UP

btn5 = digitalio.DigitalInOut(board.GP4)
btn5.direction = digitalio.Direction.INPUT
btn5.pull = digitalio.Pull.UP

btn6 = digitalio.DigitalInOut(board.GP5)
btn6.direction = digitalio.Direction.INPUT
btn6.pull = digitalio.Pull.UP

btn7 = digitalio.DigitalInOut(board.GP6)
btn7.direction = digitalio.Direction.INPUT
btn7.pull = digitalio.Pull.UP

btn8 = digitalio.DigitalInOut(board.GP7)
btn8.direction = digitalio.Direction.INPUT
btn8.pull = digitalio.Pull.UP

btn9 = digitalio.DigitalInOut(board.GP8)
btn9.direction = digitalio.Direction.INPUT
btn9.pull = digitalio.Pull.UP


print_data("Pico is running. Press buttons or send data over serial.")

def key_press_action(btn_num):
    blink_key_press(page_num)
    handle_key_press(btn_num)
    time.sleep(time_sleep)

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
        
        
        # Check button presses and send HID keycodes
        if not btn1.value:
            key_press_action(1)

        if not btn2.value:
            key_press_action(2)

        if not btn3.value:
            key_press_action(3)


        if not btn4.value:
            key_press_action(4)

        if not btn5.value:
            key_press_action(5)

        if not btn6.value:
            key_press_action(6)

        if not btn7.value:
            key_press_action(7)

        if not btn8.value:
            key_press_action(8)

        if not btn9.value:
            key_press_action(9)
        
        #change the page number
        if not page_switch.value:
            page_num = (page_num + 1) % 3 
            show_led_num(page_num)
            time.sleep(time_sleep)
            

        time.sleep(0.01)  # Short delay for stability

    except Exception as e:
        print_data(f"Error: {e}")
        time.sleep(1)
        
        
        




