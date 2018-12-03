load('api_aws.js');
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');
load('api_sys.js');

// ----------------------- THIS PART IS FOR 3.3v POWER ON PIN 17
let ADDITIONAL_POWER = 15;

GPIO.set_mode(ADDITIONAL_POWER, GPIO.MODE_OUTPUT);
GPIO.write(ADDITIONAL_POWER, 1);
// ----------------------- DON'T CHANGE THIS

// ----------------------- START - SET PIN NUMBERS
let LED_RED = 5;
let LED_GREEN = 4;

let BUTTON = 2;

// ----------------------- END - SET PIN NUMBER


// ----------------------- START - PIN SETUP
GPIO.set_mode(LED_RED, GPIO.MODE_OUTPUT);
GPIO.set_mode(LED_GREEN, GPIO.MODE_OUTPUT);

GPIO.set_mode(BUTTON, GPIO.MODE_INPUT);
// ----------------------- END - PIN SETUP


// ======================= START - CODE

// So this is all you get to start with :)
GPIO.write(LED_RED, 1);
GPIO.write(LED_GREEN, 0);


Timer.set(1000, Timer.REPEAT, function() {
    let value = GPIO.read(BUTTON);
    print("Button " + (value ? 'PRESSED' : 'in need of a TOUCH'));
}, null);

GPIO.set_button_handler(BUTTON, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function(x) {
    GPIO.toggle(LED_GREEN);
}, null);