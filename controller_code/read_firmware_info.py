from utils import print_data
def read_firmware():
    try:
        with open("firmware_info.txt", "r") as file:
            data = [line.strip() for line in file.readlines()]
        
        # print_data('Getting firmware data')
        # print_data(f"_firmware_{data[0]}_{data[1]}")
        return data
        # return data
    except Exception as e:
        print_data(f"Error printing firmware info: {e}")
        return None
