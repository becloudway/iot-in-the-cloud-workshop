load('api_aws.js');
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');
load('api_sys.js');
load('api_pwm.js');

// ----------------------- THIS PART IS FOR 3.3v POWER ON PIN 17
let PIEZO_PIN = 15;


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


let index = 0;
let notes = 0;
let repeat = true;

let melody = [];

function addNoteToMelody (note, length) {
    melody.push({
        note: note,
        length: length
    });

    notes = melody.length;
}


addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 1000);

addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 1000);
addNoteToMelody(NOTE.R, 100);

addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.C6, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.F5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.G5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 2000);
addNoteToMelody(NOTE.R, 100);

addNoteToMelody(NOTE.AS5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.AS5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.AS5, 1000);
addNoteToMelody(NOTE.R, 100);

addNoteToMelody(NOTE.AS5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 1000);
addNoteToMelody(NOTE.R, 100);

addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.G5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.G5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.A5, 500);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.G5, 1000);
addNoteToMelody(NOTE.R, 100);
addNoteToMelody(NOTE.C6, 1000);
addNoteToMelody(NOTE.R, 100);


function playNote (index) {    
    let bar = melody[index];
    
    print ("Playing " + JSON.stringify(bar.note) + " for " + JSON.stringify(bar.length / 1000) + " seconds");
    PWM.set(PIEZO_PIN, bar.note, 0.75);

    Timer.set(bar.length, 0, function(index) {
        if (index < notes - 1) {
            playNote(++index);
        } else if (repeat) {
            index = 0;
            playNote(index);
        }
    }, index);

}

playNote(0);