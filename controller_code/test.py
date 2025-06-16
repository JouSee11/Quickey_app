import board
import digitalio
import time
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
from adafruit_hid.mouse import Mouse


# Setup HID for keyboard
keyboard = Keyboard(usb_hid.devices)
mouse = Mouse(usb_hid.devices)


# Set up rotary encoder pins
clk = digitalio.DigitalInOut(board.GP14)
dt = digitalio.DigitalInOut(board.GP15)
button = digitalio.DigitalInOut(board.GP13)

clk.direction = digitalio.Direction.INPUT
dt.direction = digitalio.Direction.INPUT

button.direction = digitalio.Direction.INPUT
button.pull = digitalio.Pull.UP  # Enable internal pull-up resistor

led = digitalio.DigitalInOut(board.GP0)
led.direction = digitalio.Direction.OUTPUT


# Variables for encoder state tracking
last_clk_state = clk.value
last_time = time.monotonic()

button_last_state = button.value
button_debounce_time = time.monotonic()

while True:
    current_time = time.monotonic()
    
    # Read the encoder state
    clk_state = clk.value
    dt_state = dt.value

    # Debounce the encoder reading
    if current_time - last_time > 0.01:  # 10ms debounce
        led.value = False
        if clk_state != last_clk_state:  # CLK changed
            if dt_state != clk_state:  # Rotate right
                print("Right Arrow")
                if button_state:                    
                    keyboard.send(Keycode.RIGHT_ARROW)
                    led.value = True
                else:
                    #mouse.move(wheel=1)  # Scroll Down
                    keyboard.send(Keycode.UP_ARROW)
            else:  # Rotate left
                print("Left Arrow")
                if button_state:
                    keyboard.send(Keycode.LEFT_ARROW)
                    led.value = True
                else:
                    #mouse.move(wheel=-1)  # Scroll Down
                    keyboard.send(Keycode.DOWN_ARROW)
            last_time = current_time  # Update debounce timer

        last_clk_state = clk_state  # Update last state

    # Check button press (Up Arrow) with debounce
    button_state = button.value
    
    #if button_state == False and button_last_state == True and (current_time - button_debounce_time) > 0.2:
     #   print("Up Arrow")
      #  keyboard.press(Keycode.LEFT_ALT)  # Send Up Arrow key
       # button_debounce_time = current_time  # Update debounce timer
    #if button_state == True and button_last_state == False:
     #   keyboard.press(Keycode.LEFT_ALT) 

    button_last_state = button_state  # Update button state
