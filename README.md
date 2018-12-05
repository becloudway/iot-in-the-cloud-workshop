# Iot in the Cloud - workshop

There are 2 folders, one for ESP32 project files and information and one for AWS project files and information.

They both contain a readme.md with some information to follow the workshop. We also provided a folder called guided, in which you find some fully finished examples from the list below. With steps on how to make them yourself.

## List of things that you can do

| Mode   | Name | Description |
| :----: | ----: | ----------- |
| Easy   | Reveal CPU and RAM | Send the CPU and RAM percentages of the ESP32 by using the IoT Shadow.
| Medium | Send a love note over MqTT | Use MqTT to send a note to the ESP32 device let the ESP32 play the note and send a reply.
| Hard   | Create a JukeBox | Add multiple sounds to your ESP32 and send a MqTT message to select a sound to play |
| Easy   | Bling92  | Make some led bling for your ESP32
| Medium | Bleep92  | Make some music and add some light effects to go along with it
| Godlike?   | SoundCloud | Use S3 to store a music file (format of your creation), send a MqTT message to get a ?random? Music file from a lambda, send it back over MqTT and play that epic melody.
| Easy   | Incoming blink | When you receive a MqTT message make a led blink.
| Hard   | FaxSound | Listen to all MqTT topics and based on the messages play different notes.
| Medium | Console info | Print some statistics in your console, also add them to your shadow so that you can share them with IoT.
| Hard   | Spy Box | Try to spy on your colleagues by logging their messages and keeping statistics about them. If you see something out of the ordinary give it a good beep.
| Hard   | Sound Stream | Sends notes from one device over MqTT one by one and play them on another device
| Godlike? | Morse code | Hook up 2 devices with a button and a piezo element, use the button to send Morse code over MqTT to another device. Watchout for spy's :D.
| Godlike? | Lambda upgrade | Hook up a RDS Database to store incoming messages
| Hard     | Rule upgrade | Add a DynamoDB rule to store incoming messages
| Medium   | R2D2 | Replace every character in a sentence with sounds and play sentences like R2D2 would!
| Easy     | PoWN Led | Use a Led with PWM to show the amount of traffic on MqTT by making the led brighter or less bright.
| Godlike?     | Alarm    | Use the Device Shadow to set the time of an alarm on your ESP Device. Use the Time api (from the mongoose os docs) to see if your alarm has to go haywire and add a button for you know snooze?
| Fun | Idiot box | One button, One led and One piezo, whenever the led goes on you have to press the button otherwise your device starts to scream after some seconds. The led turns on at random intervals and here we have our idiot box. If you want to go even more idiot than you could make multiple and let them communicate over MqTT to start screaming at the same time.
| Impossible   | Creativity | Create something of your own 
