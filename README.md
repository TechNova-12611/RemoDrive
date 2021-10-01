# RemoDrive
RemoDrive allows anyone to remotely control your FTC robot! Once you [setup a room](#setting-up-a-room), anyone can [join the room](#joining-a-room) and control your robot! This can be used for many things, like:
- Letting outreach participants control a real robot
- Letting remote team members control your team's robot

And more! If you want to create your own room, follow the [setting up a room instructions](#setting-up-a-room), and if you want to join a room, follow the [joining a room instructions](#joining-a-room)! 

# Joining a Room
1. Head to [the RemoDrive website](https://ftc12611.tk)
2. Select the gamepad you want to use
3. Enter in the name of the room, which will be provided by the host
4. Press join!

Instructions on how to use the gamepad will be on-screen.

# Setting up a room
RemoDrive has 3 parts: The Robot, The Host, and The Client.

## Setting up the robot
In RemoDrive, the robot has a piece of code manipulating the gamepad. 
1. Download the class from [the releases section](https://github.com/TechNova-12611/RemoDrive/releases/)
2. Copy the class into your project. You can put it anywhere!
3. Import the `RemoDrive` class.
4. Before `waitForStart()` make a new RemoDrive object, passing the OpMode:
```java
RemoDrive rd = new RemoDrive(this);
```

You can change the port it uses by passing in an extra argument:
```java
RemoDrive rd = new RemoDrive(this, port);
```

5. After `waitForStart()`, call the `run` method:
```java
rd.run();
```
6. Once the OpMode is complete, call the `stop()` method to cleanup:
```java
rd.stop();
```

## Setting up the host
The Host needs to be connected to both the robot's WiFi Direct network and a network with internet connection. You can do this through USB wifi. Once you do that, perform the following steps:

1. Download the host app from [the releases section](https://github.com/TechNova-12611/RemoDrive/releases/) (named `RemoDrive_<Your OS>.zip`)
2. Open the host app. It will look something like this:

![Screenshot of Host App](/screenshots/host.png?raw=true)

3. Set the host to the URL of the robot controller. On Control Hubs this will be `192.168.43.1`
4. Set the port to the port used on the robot. By default it is `11039`, however if you changed it, change it here.
5. Enter in a unique room name.
6. Press Host!

Your room is now live! Give the name of the room to anyone who wants to join, and have them follow the [how to join instructions](#joining-a-room)!

# Credits
RemoDrive is heavily inspired by [TeleDrive](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0), which is developed by [Mihir Chauhan](https://github.com/mihir-chauhan).
RemoDrive is mostly developed by [Nv7](https://github.com/Nv7-GitHub) with contributions from the [FTC 12611 Team](https://github.com/TechNova-12611)