const crypto = require("crypto");

// randomly generated in: https://www.avast.com/random-password-generator
let iv = "tUpakvnLIIrWKGYL";
let key = "UZDIvJ1dQtVZRvKzgqMMfDlc7uM3tkA2";

// system ip
// defined the constants
const new_device = "127.0.0.9";
const new_device_arr = [];
const dec_devices = [];

// registered user devices
const user_devices = [
    "a83117173c92f11d69657ec9df0f9a7b",
    "73e6ba6bcd615127f460b8b0f7f8f1ca",
    "668f58fbcbde6264dd98409a2c267be1"
];

// loops through the user devices to decrypt them
// then adds all decrypted strings to the dec_devices array
user_devices.forEach((item) => {
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(item, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    dec_devices.push(decrypted);
});

// adds the user (system) ip to an array
// (so that we can compare every item of both arrays)
new_device_arr.push(new_device);

// validates if the user ip is in the registered user devices
const validates = new_device_arr.some((v) => dec_devices.includes(v));

// if it does, then everything will go as normal
if (validates === true) {
    console.log("The device exists in the user_devices.");
} else {
    // if it doesn't, we will ecrypt the new user device
    // and then will register it to the user_devices
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(new_device, "utf-8", "hex");
    encrypted += cipher.final("hex");
    user_devices.push(encrypted);
    console.log(user_devices);
}
