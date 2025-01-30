import board
import digitalio
import time

button = digitalio.DigitalInOut(board.GP14)
button.direction = digitalio.Direction.INPUT
button.pull = digitalio.Pull.UP

def button_pressed():
    print("Button was pressed!")

while True:
    if not button.value:
        button_pressed()
        time.sleep(0.2)  # Debounce delay
