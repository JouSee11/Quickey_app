import json
import time
from globals import keyboard, btn_keys, keyboardLayout, mouse, consumer
from adafruit_hid.consumer_control_code import ConsumerControlCode
from key_code_conversion import JS_TO_ADAFRUIT_HID
from utils import print_data



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
        print_data(f"[FROM DEVICE] Received: {data}")  # Confirm via serial
        converted_data = json.loads(data)
        with open('config_data.json', 'w') as f:
            json.dump(converted_data, f)  # Write data to filesystem
        print_data("[FROM DEVICE] Data saved successfully!")  # Success message
    except Exception as e:
        print_data(f"Error saving data: {e}")
        
def handle_key_press(key_num):
    all_keys = btn_keys[str(key_num)]
    
    
    if len(all_keys) == 0: return
    
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
            
            no_action_nodes = ["releaseAll", "volumeUp", "volumeDown", "volumeMute", "playPause", "playNext", "playPrev"]
            
            #check if there is some value assigned to the node (releaseAll donest have any value assigned)
            if not action_value and action_name not in no_action_nodes:
                print("no value assigned to the node!")
                
            elif action_name == "pressRelease":
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
                try:
                    time.sleep(float(action_value) / 1000)
                except:
                    print("empty delay node")
                
            elif action_name == "write":
                keyboardLayout.write(action_value)
            
            elif action_name == "mouseMove":
                horizontal_dir, vertical_dir, horiz_val, vert_val = action_value.split("&")
                horiz_sign = -1 if horizontal_dir.lower() == "left" else 1
                vert_sign = -1 if vertical_dir.lower() == "up" else 1
                mouse.move(int(horiz_val) * horiz_sign, int(vert_val) * vert_sign)
            
            elif action_name == "mouseClick":                    
                if action_value == "left":
                    mouse_click(mouse.LEFT_BUTTON)
                elif action_value == "right":
                    mouse_click(mouse.RIGHT_BUTTON)
                elif action_value == "middle":
                    mouse_click(mouse.MIDDLE_BUTTON)
                
                time.sleep(0.1)
                
            elif action_name == "volumeUp":
                print("volume up")
                consumer.send(ConsumerControlCode.VOLUME_INCREMENT)
            elif action_name == "volumeDown":
                consumer.send(ConsumerControlCode.VOLUME_DECREMENT)
            elif action_name == "volumeMute":
                consumer.send(ConsumerControlCode.MUTE)
            elif action_name == "playPause":
                consumer.send(ConsumerControlCode.PLAY_PAUSE)
            elif action_name == "playNext":
                consumer.send(ConsumerControlCode.SCAN_NEXT_TRACK)
            elif action_name == "playPrev":
                consumer.send(ConsumerControlCode.SCAN_PREVIOUS_TRACK)
                
            time.sleep(0.1)
        
    keyboard.release_all()
    
def mouse_click(mouse_action):
    mouse.press(mouse_action)
    time.sleep(0.1)
    mouse.release(mouse_action)
    
def encoder_execute_action(action):
    encoder_actions = btn_keys["knob"]

    if action == "left":
        encoder_rotate_action(encoder_actions[0])
    elif action == "right":
        encoder_rotate_action(encoder_actions[1])
    elif action == "button":
        encoder_rotate_action(encoder_actions[2])

def encoder_rotate_action(action_code):
    if action_code == "volumeUp":
        consumer.send(ConsumerControlCode.VOLUME_INCREMENT)
    elif action_code == "volumeDown":
        consumer.send(ConsumerControlCode.VOLUME_DECREMENT)
    elif action_code == "playNext":
        consumer.send(ConsumerControlCode.SCAN_NEXT_TRACK)
    elif action_code == "playPrev":
        consumer.send(ConsumerControlCode.SCAN_PREVIOUS_TRACK)
    elif action_code == "scrollUp":
        mouse.move(wheel=1)
    elif action_code == "scrollDown":
        mouse.move(wheel=-1)
    elif action_code == "mouseMiddle":
        mouse_click(mouse.MIDDLE_BUTTON)
    elif action_code == "volumeMute":
        consumer.send(ConsumerControlCode.MUTE)
    elif action_code == "playPause":
        consumer.send(ConsumerControlCode.PLAY_PAUSE)
    elif action_code == "stop":
        consumer.send(ConsumerControlCode.STOP)
    else:
        adafruit_key_code = JS_TO_ADAFRUIT_HID.get(action_code, None)
        keyboard.send(adafruit_key_code)
        

def export_data_to_browser():
    data = read_data()
    print_data(f"_import_{json.dumps(data)}")
    #js_keycode = btn_keys[str(key_num)][0]
    #adafruit_keycode = JS_TO_ADAFRUIT_HID.get(js_keycode, None)
    #keyboard.press(adafruit_keycode)
    #keyboard.release(adafruit_keycode)
    
btn_keys = read_data()
