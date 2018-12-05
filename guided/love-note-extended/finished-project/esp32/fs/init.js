// Load some dependencies
load('api_aws.js');
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');
load('api_sys.js');
load('api_pwm.js');

/*
* We used pin 15 as an additional 3.3v power pin because our breadboards where a bit to small :D
* But as you can see we got a workaround for that.
*/

// ----------------------- THIS PART IS FOR 3.3v POWER ON PIN 15
let ADDITIONAL_POWER = 15;

GPIO.set_mode(ADDITIONAL_POWER, GPIO.MODE_OUTPUT);
GPIO.write(ADDITIONAL_POWER, 1);
// ----------------------- DON'T CHANGE THIS

// Where your code starts

let PIEZO_PIN = 5;
PWM.set(PIEZO_PIN, 0, 0);

// NOTE object maps Frequencies to Notes
let NOTE = {
    C5: 523,
    CS5: 554,
    D5: 587,
    DS5: 622,
    E5: 659,
    F5: 698,
    FS5: 740,
    G5: 784,
    GS5: 831,
    A5: 880,
    AS5: 932,
    Bb5: 920,
    B5: 988,
    C6: 1047,
    R: 0
};

let state = {lastPlayedNote: ''};

// Accepts a note (which is a string) that exists in the NOTE object.
function playNote(note) {
    // Play the note
    PWM.set(PIEZO_PIN, NOTE[note], 0.75);

    // After 1 second stop playing the note
    Timer.set(1000, 0, function() {
        PWM.set(PIEZO_PIN, 0, 0);
    }, null);

    state.lastPlayedNote = note;
    AWS.Shadow.update(0, state);
}

// Call the playNote function with as note parameter G5
// playNote("G5");

function mqtt_init () {
    print("MqTT init is called")
    // Some more code here, fi. sending a message
}

MQTT.setEventHandler(function (conn, ev, edata) {
    if (ev !== 0) print('MQTT event handler: got', ev);
  
    if (ev === MQTT.EV_CONNACK) {
      print("Connection Accepted");
  
      mqtt_init();
    
    } else if (ev === MQTT.EV_CLOSE) {
      print("Connection Lost");
    }
}, null);

MQTT.sub('iot/team_name/note', function(conn, topic, msg) {
    // This will print the message to the console.
    print('Topic:', topic, 'message:', msg);
    playNote(msg);
}, null);

AWS.Shadow.setStateHandler(function(data, event, reported, desired, reported_metadata, desired_metadata) {
    // Check if the event is a CONNECTED event, which occurs when your connected succesfull

    if (event === AWS.Shadow.CONNECTED) {
        // AWS Shadow connect code here
        playNote('B5');

        // Check if the reported state contains the lastPlayedNote, if not, than send it.
        if (reported.lastPlayedNote === undefined) {
            AWS.Shadow.update(0, state);
        }
    } else if (event === AWS.Shadow.UPDATE_DELTA) { // Check if there is a DELTA update

        // This for loop will loop through each key and update the state if there was an update on that key.
        for (let key in state) {
            if (desired[key] !== undefined) state[key] = desired[key];
        }
        
        // Now we send our updated shadow state back to AWS to confirm the state.
        AWS.Shadow.update(0, state);  // Report device state
    } 



    // And some logging to see what happens behind the screen.
    print(JSON.stringify(reported), JSON.stringify(desired));
}, null);