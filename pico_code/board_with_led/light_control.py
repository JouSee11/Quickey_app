from globals import page_num, led0, led1, led2, led_list
from time import sleep

def show_led_num(cur_page):
    turn_off_all()
    led_list[cur_page].value = True
    
def start_light():
    for _ in range(3):
        turn_on_all()
        sleep(0.3)
        turn_off_all()
        sleep(0.3)
        
def turn_on_all():
    led0.value = True
    led1.value = True
    led2.value = True
    
def turn_off_all():
    led0.value = False
    led1.value = False
    led2.value = False

def blink_key_press(cur_page):
    led_list[cur_page].value = False
    sleep(0.1)
    led_list[cur_page].value = True