from adafruit_hid.keycode import Keycode
JS_TO_ADAFRUIT_HID = {
    # Letter Keys
    "KeyA": Keycode.A, "KeyB": Keycode.B, "KeyC": Keycode.C, "KeyD": Keycode.D,
    "KeyE": Keycode.E, "KeyF": Keycode.F, "KeyG": Keycode.G, "KeyH": Keycode.H,
    "KeyI": Keycode.I, "KeyJ": Keycode.J, "KeyK": Keycode.K, "KeyL": Keycode.L,
    "KeyM": Keycode.M, "KeyN": Keycode.N, "KeyO": Keycode.O, "KeyP": Keycode.P,
    "KeyQ": Keycode.Q, "KeyR": Keycode.R, "KeyS": Keycode.S, "KeyT": Keycode.T,
    "KeyU": Keycode.U, "KeyV": Keycode.V, "KeyW": Keycode.W, "KeyX": Keycode.X,
    "KeyY": Keycode.Y, "KeyZ": Keycode.Z,

    # Number Row Keys (Above Letters)
    "Digit1": Keycode.ONE, "Digit2": Keycode.TWO, "Digit3": Keycode.THREE,
    "Digit4": Keycode.FOUR, "Digit5": Keycode.FIVE, "Digit6": Keycode.SIX,
    "Digit7": Keycode.SEVEN, "Digit8": Keycode.EIGHT, "Digit9": Keycode.NINE,
    "Digit0": Keycode.ZERO,

    # Numpad Keys
    "Numpad1": Keycode.KEYPAD_ONE, "Numpad2": Keycode.KEYPAD_TWO,
    "Numpad3": Keycode.KEYPAD_THREE, "Numpad4": Keycode.KEYPAD_FOUR,
    "Numpad5": Keycode.KEYPAD_FIVE, "Numpad6": Keycode.KEYPAD_SIX,
    "Numpad7": Keycode.KEYPAD_SEVEN, "Numpad8": Keycode.KEYPAD_EIGHT,
    "Numpad9": Keycode.KEYPAD_NINE, "Numpad0": Keycode.KEYPAD_ZERO,
    "NumpadEnter": Keycode.KEYPAD_ENTER, "NumpadDecimal": Keycode.KEYPAD_PERIOD,

    # Special Keys
    "Enter": Keycode.ENTER, "Backspace": Keycode.BACKSPACE, "Tab": Keycode.TAB,
    "Escape": Keycode.ESCAPE, "Space": Keycode.SPACEBAR,

    # Modifier Keys
    "ShiftLeft": Keycode.SHIFT, "ShiftRight": Keycode.SHIFT,
    "ControlLeft": Keycode.CONTROL, "ControlRight": Keycode.CONTROL,
    "AltLeft": Keycode.ALT, "AltRight": Keycode.ALT,

    #navigation keys
    "Insert": Keycode.INSERT, "Home": Keycode.HOME,  
    "PageUp": Keycode.PAGE_UP, "Delete": Keycode.DELETE,  
    "End": Keycode.END, "PageDown": Keycode.PAGE_DOWN,   


    # Arrow Keys
    "ArrowUp": Keycode.UP_ARROW, "ArrowDown": Keycode.DOWN_ARROW,
    "ArrowLeft": Keycode.LEFT_ARROW, "ArrowRight": Keycode.RIGHT_ARROW,

    # Function Keys
    "F1": Keycode.F1, "F2": Keycode.F2, "F3": Keycode.F3, "F4": Keycode.F4,
    "F5": Keycode.F5, "F6": Keycode.F6, "F7": Keycode.F7, "F8": Keycode.F8,
    "F9": Keycode.F9, "F10": Keycode.F10, "F11": Keycode.F11, "F12": Keycode.F12,

    # Symbols
    "Minus": Keycode.MINUS, "Equal": Keycode.EQUALS,
    "BracketLeft": Keycode.LEFT_BRACKET, "BracketRight": Keycode.RIGHT_BRACKET,
    "Backslash": Keycode.BACKSLASH, "Semicolon": Keycode.SEMICOLON,
    "Quote": Keycode.QUOTE, "Comma": Keycode.COMMA, "Period": Keycode.PERIOD,
    "Slash": Keycode.FORWARD_SLASH, "Backquote": Keycode.GRAVE_ACCENT,
    
    #meta keys
    "MetaLeft": Keycode.GUI,
    "MetaRight": Keycode.GUI
}
