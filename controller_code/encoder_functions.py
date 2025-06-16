import time
from read_save_data import encoder_execute_action

def encoder_action(encoder_states, encoder_elements):
    current_time = time.monotonic()

    clk_state = encoder_elements["clk"].value
    dt_state = encoder_elements["dt"].value

    # Debounce the encoder reading
    if current_time - encoder_states["last_time"] > 0.01:  # 10ms debounce
        if clk_state != encoder_states["last_clk_state"]:  # CLK changed
            if dt_state != clk_state:  # Rotate right
                encoder_execute_action("right")
            else:  # Rotate left
                encoder_execute_action("left")

            encoder_states["last_time"] = current_time  # Update debounce timer

        # Check button press
        if encoder_elements["btn"].value == False and encoder_states["button_last_state"] == True and (current_time - encoder_states["button_debounce_time"]) > 0.2:
            print("Button pressed")
            encoder_execute_action("button")
            encoder_states["button_debounce_time"] = current_time

        encoder_states["last_clk_state"] = clk_state  # Update last state



