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

// ----------------------- END - SET PIN NUMBER


// ----------------------- START - PIN SETUP
GPIO.set_mode(LED_RED, GPIO.MODE_OUTPUT);

// ----------------------- END - PIN SETUP


// ======================= START - CODE

// So this is all you get to start with :)
GPIO.write(LED_RED, 1);
