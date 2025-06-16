import globals
from time import sleep


def show_led_num(cur_page):
    turn_off_all()
    globals.led_list[cur_page].value = True
    
def start_light():
    for _ in range(3):
        turn_on_all()
        sleep(0.3)
        turn_off_all()
        sleep(0.3)
        
def turn_on_all():
    for led in globals.led_list.values():
        led.value = True

def turn_off_all():
    for led in globals.led_list.values():
        led.value = False

def blink_key_press(cur_page, value):
    globals.led_list[cur_page].value = value
