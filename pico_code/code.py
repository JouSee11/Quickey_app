import time
import board
import digitalio
import usb_hid
import storage  # For filesystem control
import supervisor
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
import json
import sys
from key_code_conversion import JS_TO_ADAFRUIT_HID

def print_data(data):
    print(data + "\n")

def read_data():
    try:
        with open("config_data.json", "r") as file:
            data = json.load(file)
        
        print_data(f"Loaded data {data}")
        return data
    except Exception as e:
        print_data(f"Error reading data: {e}")
        return None


# Function to save data from serial input
def save_data(data):
    try:
        print_data(f"[Pico] Received: {data}")  # Confirm via serial
        converted_data = json.loads(data)
        with open('config_data.json', 'w') as f:
            json.dump(converted_data, f)  # Write data to filesystem
        print_data("[Pico] Data saved successfully!")  # Success message
    except Exception as e:
        print_data(f"Error saving data: {e}")
        
def handle_key_press(key_num):
    all_keys = btn_keys[str(key_num)]
    
    for js_keycode in all_keys:
        adafruit_keycode = JS_TO_ADAFRUIT_HID.get(js_keycode, None)
        keyboard.press(adafruit_keycode)
        
    keyboard.release_all()

def export_data_to_browser():
    data = read_data()
    print_data(f"_import_{json.dumps(data)}")
    #js_keycode = btn_keys[str(key_num)][0]
    #adafruit_keycode = JS_TO_ADAFRUIT_HID.get(js_keycode, None)
    #keyboard.press(adafruit_keycode)
    #keyboard.release(adafruit_keycode)

# Initialize the onboard LED
led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

# Initialize the keyboard
keyboard = Keyboard(usb_hid.devices)

#buttons functionality
btn_keys = read_data()

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
        
        
        

