# buttons.py
import board
import digitalio

#setups
def setup_button(pin):
    btn = digitalio.DigitalInOut(pin)
    btn.direction = digitalio.Direction.INPUT
    btn.pull = digitalio.Pull.UP
    return btn

def setup_leds(pin):
    led = digitalio.DigitalInOut(pin)
    led.direction = digitalio.Direction.OUTPUT
    return led

def setup_encoder(pin):
    encoder_pin = digitalio.DigitalInOut(pin)
    encoder_pin.direction = digitalio.Direction.INPUT
    return encoder_pin


#inits
def init_buttons():
    return {
        1: setup_button(board.GP0),
        2: setup_button(board.GP1),
        3: setup_button(board.GP2),
        4: setup_button(board.GP3),
        5: setup_button(board.GP4),
        6: setup_button(board.GP5),
        7: setup_button(board.GP6),
        8: setup_button(board.GP7),
        9: setup_button(board.GP8),
    }

def init_leds():
    return{
        0: setup_leds(board.GP11),
        1: setup_leds(board.GP10),
        2: setup_leds(board.GP9)
    }

def init_page_switch():
    return setup_button(board.GP12)

def init_encoder():
    return{
        "clk": setup_button(board.GP14),
        "dt": setup_button(board.GP15),
        "btn": setup_button(board.GP13),
    }