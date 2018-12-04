# The Extended Love Note

> ### Make sure to finish basic setup first!
> We wrote a basic installation manual which you can find here: [Basic Installation](../installation/readme.md). 
> You can also use the Quickstart guide from Mongoose Os which can be found here [Quick Start Guide - Mongoose Os](https://mongoose-os.com/docs/quickstart/setup.md) finish step 1 to 3 and you should be fine.

## What you will be making?

For this "challenge" we will create an ESP32 with buzzer (piezo element) that plays a note that it receives from a lambda which sends this note over MqTT.
It will also send feedback by using the device shadow to send the last played notes.

This is the extended version of this challenge because I added a lambda to send the notes, you can do it without lambda by using the AWS IoT Service to publish the "note". To do this you can go to the AWS IoT Console and use the test option in the menu (As you can see later when we test our ESP32, before making the lambda).

## What you will need

- ESP32 (or another device that runs Mongoose Os)
- Breadboard
- Piezo (Buzzer) element
- Some wires to hook everything up
- A laptop with MOS (Mongoose Os Tool) installed
- Access Point with basic WPA2 auth (ssid & password) to connect your device to the internet

Optional:

- A resistor (to lower the volume) ranging from 60k upto 1m depending on your setup
  - I used a 330k resistor

## The wiring

The wiring for this guide is pretty straightforward we use a Piezo buzzer and wire it to a PWM enabled pin.
You can follow the fritzing down here or try it on your own. For our DevKitC board we used pin 5 as PWM output pin.

If you whant to read more about Pulse Width Modulation read this article on [sparkfun](https://learn.sparkfun.com/tutorials/pulse-width-modulation/all).

> Make sure to wire the ground correctly. In our case there is a `+` sign on the buzzer that shows us how to wire it we connect the negative `-` side to the ground.

> You can incease and decrease the volume by increasing and decreasing the resistance.

![wiring](./images/love-note-setup_bb.png)

## Programming the ESP32

We will do this step by step, if you follow the steps correctly you will be fine. For eas of use (and a more generic guide) we will be using the MOS UI. 

### Before we start with coding

We recommend that you create a folder for your ESP projects. It doesn't really mather whereas long as your remember the path.
In this folder we will start, you can start by opening up the MOS Tool:

#### Linux/Unix
```sh
mos ui
```

#### Windows

For windows, we recommend to start by clicking on the mos.exe file this should do the trick.

### The mos UI

Once you started the UI you will see the following (on linux it will open up a browser window):

![mos ui](../images/mos_ui.png)

The screen is devided in some textaraea's and dropdown menu's the nummber that you see above mean:

1. Here you will see the output of your **commands**
2. Here you will see the output from your **device**
3. here you can select the port used to communicate with your device
4. Here you can select the type of device that you are using
5. Here you can enter commands (os spefific fi. ls and mos commands).

Now start with selecting the right port, you can do this by selecting the dropdown box and selecting the right port for linux/unix users this will be `/dev/cu.SLAB_USBtoUART` (or alike) for windows users it can be a port that starts with `COM` followed by a number fi. `COM3`.

![Port selection](../images/port_selection.png)

If your device type isn't selected yet, than do so by selecting the dropdown-box and clicking on `esp32`.

![Device selection](../images/device_selection.png)

Next up is navigating to our workspace (folder). You can do this by selecting the orange folder box button ![folder selection](../images/folder_selection.png) and navigating to your workspace folder.

Another option is to use command input to enter commands.

![folder navigation](../images/folder_navigation.png)

When you get into the right folder, you can continue to the next step.

## Cloning the boilerplate

> For this part your need GIT installed or you can download the zip file and unzip it on your computer. We are going to show the GIT method. The boilerplate however can be found here: [https://github.com/becloudway/iot-in-the-cloud-workshop-boilerplate](https://github.com/becloudway/iot-in-the-cloud-workshop-boilerplate)

You can clone the boilerplate by using the command down here:

```sh
git clone --depth=1 --branch=master https://github.com/becloudway/iot-in-the-cloud-workshop-boilerplate.git love-note && rm -rf love-note/.git
```

This will clone the project and remove the .git history etc. so that you have a clean folder to work with.

## Let's get started
### Step 1

Now in your MOS UI navigate towards the folder using the ![folder selection](../images/folder_selection.png) icon.
The folder's name should be love-note.

Your path should look something like this.

```
windows: c:\users\youruser\...\workspace\love-note

Unix\Linux: /Users/youruser/.../workspace/love-note
```

When you run the following command:

```
// windows
tree

// Linux/Unix
find .
```

It should show you the following file/folder structure:

![folder content](./images/content.png)

The most important files are `./mos.yml` and `./fs/init.js` so let me explain these to you.

`mos.yml`

This is the mos definition file used for building your project, it contains references to the libraries you use and about your target platform etc. You can open the file and check it out if you like but we  did the setup for you.

`./fs/init.js`

This file holds your code, in this file we will be working.

### Step 2

Now let's open `./fs/init.js` in your favorite code editor. So that we can start coding.

When you open the file it should have the following content:

```js
// Load some dependencies
load('api_aws.js');
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');
load('api_sys.js');

/*
* We used pin 17 as an additional 3.3v power pin because our breadboards where a bit to small :D
* But as you can see we got a workaround for that.
*/

// ----------------------- THIS PART IS FOR 3.3v POWER ON PIN 17
let ADDITIONAL_POWER = 15;

GPIO.set_mode(ADDITIONAL_POWER, GPIO.MODE_OUTPUT);
GPIO.write(ADDITIONAL_POWER, 1);
// ----------------------- DON'T CHANGE THIS

// Where your code starts
// You can remove the timer down here.

Timer.set(1000, Timer.REPEAT, function () {
    print("Hello World!");
}, null);
```

The first lines load the modules that we use in our code, fi. the aws api so that we can communicate with AWS. But it also loads basic functionality from mongoose os.

For the tutorial we will focus on everything underneath the following line:

```js
// Where your code starts
```

There is a timer down there so we will first check if everything is setup correctly. We will do this by finally running a program on our ESP32.

So how do we get started, well make sure that you now connect your ESP32 to your computer. And open up the MOS UI.
Make sure that you are connected to your device and selected the right device type.

![Device and port selection](../images/device_and_port_selection.png)

Next enter the following command: `mos build` this will send your code and mos.yml towards the mongoose cloud server that builds your code and sends back a nice packaged firmware that you can flash onto your device.

Your output should look similar to this:

![mos build](../images/build.png)



> If you whant to learn more about flashing and firmware [click here](https://en.wikipedia.org/wiki/Firmware) :)

