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


let MQTT_STATE = 0;
let AWS_STATE = 0;

// ----------------------- START - PIN SETUP
GPIO.set_mode(LED_RED, GPIO.MODE_OUTPUT);
GPIO.set_mode(LED_GREEN, GPIO.MODE_OUTPUT);

GPIO.set_mode(BUTTON, GPIO.MODE_INPUT);
// ----------------------- END - PIN SETUP

let state = {
    on: false, counter: 0, button_presses: 0, message: ""
};

// ======================= START - CODE

// So this is all you get to start with :)

GPIO.blink(LED_GREEN, 500, 500);
GPIO.blink(LED_RED, 500, 500);

Timer.set(15000, Timer.REPEAT, function() {
    let value = GPIO.read(BUTTON);
    print("Button " + (value ? 'PRESSED' : 'in need of a TOUCH'));
    state.on = (value === 1 ? true : false);
    
    state.counter++;


    AWS.Shadow.update(0, state);
}, null);

function mqtt_init () {
    // Your code that requires mqtt here
    GPIO.blink(LED_GREEN, 0 , 0);
    GPIO.write(LED_GREEN, 1);
}

function aws_init () {
    GPIO.blink(LED_RED, 0 , 0);
    GPIO.write(LED_RED, 1);

    AWS.Shadow.update(0, state);
}

MQTT.setEventHandler(function (conn, ev, edata) {
  if (ev !== 0) print('MQTT event handler: got', ev);

  if (ev === MQTT.EV_CONNACK) {
    print("Connection Accepted");
    MQTT_STATE = 1;

    mqtt_init();
  
  } else if (ev === MQTT.EV_CLOSE) {
    print("Connection Lost");
    MQTT_STATE = 0;
  }
}, null);

function send (topic, message) {
    if (MQTT_STATE === 1) {
        MQTT.pub(topic, message, 0);
    }
}

GPIO.set_button_handler(BUTTON, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function(x) {
    state.button_presses++;
    send("iot/demo", JSON.stringify({t: "message", counter: state.counter}));
}, null);

AWS.Shadow.setStateHandler(function(data, event, reported, desired, reported_metadata, desired_metadata) {
    if (event === AWS.Shadow.CONNECTED) {
        aws_init();
    } else if (event === AWS.Shadow.UPDATE_DELTA) {
        for (let key in state) {
            if (desired[key] !== undefined) state[key] = desired[key];
        }
        
        AWS.Shadow.update(0, state);  // Report device state
    }

    print(JSON.stringify(reported), JSON.stringify(desired));
}, null);