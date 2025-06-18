import time
import board
import digitalio
import usb_hid
import storage  # For filesystem control
import supervisor
import sys

from board_elements import init_buttons, init_page_switch, init_leds, init_encoder
from globals import page_num
import globals
from encoder_functions import *
from light_control import *
from read_save_data import *
from read_firmware_info import read_firmware

time_sleep = 0.005

globals.led_list = init_leds()

#show the start animation and switch to current page
start_light()
show_led_num(page_num)

#set firmware data
globals.DEVICE_NAME, globals.FIRMWARE_VERSON = read_firmware()

# Initialize buttons
page_switch = init_page_switch()
buttons = init_buttons()
encoder_elements = init_encoder()

#states for handling the encoder
encoder_states = {
    "last_clk_state": encoder_elements["clk"].value,
    "last_time": time.monotonic(),
    "button_last_state": encoder_elements["btn"].value,
    "button_debounce_time": time.monotonic()
}
buttons_state = {i: True for i in range(1, 10)} # store states for the buttons

print_data("Macropad is running. Press buttons or send data over serial.")

def calc_cur_btn_num(btn_num):
    return btn_num + page_num * 9

def key_press_action(btn_num):
    global previous_pressed
    blink_key_press(page_num, False)
    
    handle_key_press(btn_num)

    time.sleep(time_sleep + 0.08)
    blink_key_press(page_num, True)


#main loop checks
def check_for_incomming_data():
    # Check for incoming serial data - incoming update from quickey.pro
    if supervisor.runtime.serial_bytes_available:
        data = sys.stdin.readline().strip()
        if data: # if any data are
            if (data == "import data"):
                export_data_to_browser()
            elif (data == "firmware data"):
                print("[FROM DEVICE] sending firmware data")
                print_data(f"_firmware_{globals.DEVICE_NAME}_{globals.FIRMWARE_VERSON}")
            else:
                save_data(data)  # Save to filesystem
                supervisor.reload() # reload the device when we save the data to it


def check_button_press():
    # Check button presses and send HID keycodes
    for i in range(1, 10):

        cur_value = buttons[i].value
        prev_value = buttons_state[i]

        if prev_value and not cur_value:
            key_press_action(calc_cur_btn_num(i))

        buttons_state[i] = cur_value
    
def check_page_switch(): 
    global page_num
    #change the page number
    if not page_switch.value:
        print_data("page switched")
        page_num = (page_num + 1) % 3 
        show_led_num(page_num)
        time.sleep(time_sleep + 0.3)

def check_encoder_action():    
    # encoder_result = check_encoder_action()
    # if encoder_result is not None:
    encoder_action(encoder_states, encoder_elements)
    encoder_states["button_last_state"] = encoder_elements["btn"].value
    return

while True:
    try:
        check_for_incomming_data()  # Check for incoming serial data
        
        check_button_press()  # Check button presses

        check_encoder_action()  # Check encoder actions
        
        check_page_switch()  # Check if the page switch button is pressed

        time.sleep(time_sleep)  # Short delay for stability

    except Exception as e:
        print_data(f"Error: {e}")
        time.sleep(1)
        
        
        




