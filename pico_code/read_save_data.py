import json
import time
from globals import keyboard, btn_keys, keyboardLayout
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
    
    #check if it is a regular key press or multi key
    if all_keys[0] != "multi":
        for js_keycode in all_keys:
            adafruit_keycode = JS_TO_ADAFRUIT_HID.get(js_keycode, None)
            keyboard.press(adafruit_keycode)
    else:
        for cur_action in all_keys[1::]:
            action_name = cur_action.split("_")[1]
            action_value = cur_action.split("_")[2]
            
            print(action_name)
            print(action_value)

            if action_name == "pressRelease":
                adafruit_keycode = JS_TO_ADAFRUIT_HID.get(action_value, None)
                keyboard.press(adafruit_keycode)
                time.sleep(0.1)
                keyboard.release(adafruit_keycode)
            
            elif action_name == "hold":
                adafruit_keycode = JS_TO_ADAFRUIT_HID.get(action_value, None)
                keyboard.press(adafruit_keycode)

            elif action_name == "release":
                adafruit_keycode = JS_TO_ADAFRUIT_HID.get(action_value, None)
                keyboard.release(adafruit_keycode)

            elif action_name == "releaseAll":
                keyboard.release_all()

            elif action_name == "delay":
                time.sleep(float(action_value) / 1000)
                
            elif action_name == "write":
                keyboardLayout.write(action_value + "\n")
            
            time.sleep(0.1)
        
    keyboard.release_all()

def export_data_to_browser():
    data = read_data()
    print_data(f"_import_{json.dumps(data)}")
    #js_keycode = btn_keys[str(key_num)][0]
    #adafruit_keycode = JS_TO_ADAFRUIT_HID.get(js_keycode, None)
    #keyboard.press(adafruit_keycode)
    #keyboard.release(adafruit_keycode)
    
btn_keys = read_data()
