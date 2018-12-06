load('api_aws.js');
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');
load('api_sys.js');
load('api_pwm.js');

let PIEZO_PIN = 15;


let NOTE = {
    A4: 440,
    Bb4: 466,
    B4: 494,
    E4: 330,
    G4: 392,
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

function addRustNoteToMelody (note, length, rLength) {
    melody.push({
        note: note,
        length: length
    });

    melody.push({
        note: NOTE.R,
        length: rLength
    });

    notes = melody.length;
}

addRustNoteToMelody(NOTE.E5, 100, 20);
addRustNoteToMelody(NOTE.E5, 100, 100);
addRustNoteToMelody(NOTE.E5, 100, 100);

addRustNoteToMelody(NOTE.C5, 100, 20);
addRustNoteToMelody(NOTE.E5, 200, 20);
addRustNoteToMelody(NOTE.G5, 200, 200);

addRustNoteToMelody(NOTE.G4, 200, 200);

addRustNoteToMelody(NOTE.C5, 300, 20);
addRustNoteToMelody(NOTE.G4, 100, 200);
addRustNoteToMelody(NOTE.E4, 300, 20);

addRustNoteToMelody(NOTE.A4, 200, 20);
addRustNoteToMelody(NOTE.B4, 200, 20);
addRustNoteToMelody(NOTE.Bb4, 100, 20);

addRustNoteToMelody(NOTE.A4, 200, 20);
addRustNoteToMelody(NOTE.G4, 66, 20);
addRustNoteToMelody(NOTE.E5, 66, 20);
addRustNoteToMelody(NOTE.G5, 66, 20);

addRustNoteToMelody(NOTE.A5, 200, 20);
addRustNoteToMelody(NOTE.F5, 100, 20);
addRustNoteToMelody(NOTE.G5, 100, 100);

addRustNoteToMelody(NOTE.E5, 200, 20);
addRustNoteToMelody(NOTE.C5, 100, 20);
addRustNoteToMelody(NOTE.D5, 100, 20);

addRustNoteToMelody(NOTE.B5, 300, 20);
addRustNoteToMelody(NOTE.C5, 300, 20);
addRustNoteToMelody(NOTE.G4, 100, 200);

addRustNoteToMelody(NOTE.E4, 300, 20);
addRustNoteToMelody(NOTE.A4, 200, 20);
addRustNoteToMelody(NOTE.B4, 200, 20);

addRustNoteToMelody(NOTE.Bb4, 100, 20);
addRustNoteToMelody(NOTE.A4, 200, 20);
addRustNoteToMelody(NOTE.G4, 66, 20);

addRustNoteToMelody(NOTE.E5, 66, 20);
addRustNoteToMelody(NOTE.G5, 66, 20);
addRustNoteToMelody(NOTE.A5, 200, 20);
addRustNoteToMelody(NOTE.F5, 100, 20);
addRustNoteToMelody(NOTE.G5, 100, 100);

addRustNoteToMelody(NOTE.E5, 200, 20);
addRustNoteToMelody(NOTE.C5, 100, 20);
addRustNoteToMelody(NOTE.D5, 100, 20);
addRustNoteToMelody(NOTE.B4, 300, 2500);

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