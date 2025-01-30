function convertCodeToKey(key){
    if (key.substring(0, 3) === "Key") {
        return key[3]
    }
}

console.log(convertCodeToKey("KeyA"))