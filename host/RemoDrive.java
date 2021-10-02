package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.OpMode;
import com.qualcomm.robotcore.hardware.Gamepad;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class RemoDrive {
    private DatagramSocket socket;
    private Thread thread;
    private OpMode op;

    private boolean running;

    int port = 11039;
    final String address = "192.168.43.1";

    public RemoDrive(OpMode op) {
        this.op = op;
        this.init();
    }

    public RemoDrive(OpMode op, int port) {
        this.port = port;
        this.op = op;
        this.init();
    }

    private void init() {
        op.telemetry.addData("Connect RemoDrive host to", address + port);
        op.telemetry.addData("Status", "Initialized");

        // Init socket
        try {
            this.socket = new DatagramSocket(port);
        } catch (Exception ex) {
            op.telemetry.addData("Exception: ", ex.getMessage());
        }

        op.telemetry.update();
    }

    public void run() {
        this.thread = new Thread(new Runnable() {
            @Override
            public void run() {
                while (running) {
                    handleMessage();
                }
            }
        });
        this.thread.setName("RemoDrive");
        this.thread.setPriority(Thread.NORM_PRIORITY);
        this.running = true;
        this.thread.start();
    }

    public void stop() {
        this.running = false;
        this.socket.close();
    }

    final String GAMEPAD1 = "g1";
    final String GAMEPAD2 = "g2";

    private void handleMessage() {
        // Receive Message
        String cmd = "";
        try {
            byte[] buffer = new byte[1024];
            DatagramPacket response = new DatagramPacket(buffer, buffer.length);
            socket.receive(response);
            cmd = new String(buffer, 0, response.getLength());
        } catch (Exception ignore) {

        }

        // Process
        String[] vals = cmd.split("_");
        Gamepad gamepad;
        if (vals[0].equals(GAMEPAD1)) {
            gamepad = this.op.gamepad1;
        } else if (vals[0].equals(GAMEPAD2)) {
            gamepad = this.op.gamepad2;
        } else {
            return;
        }

        // Edit Gamepad Obj
        if (vals[1].equals("bool")) {
            gamepad = this.processBool(vals[2], vals[3].equals("true"), gamepad);
        } else {
            float val = Float.parseFloat(vals[3]);
            gamepad = this.processValue(vals[2], val, gamepad);
        }

        // Save
        if (vals[0].equals(GAMEPAD1)) {
            this.op.gamepad1 = gamepad;
        } else {
            this.op.gamepad2 = gamepad;
        }
    }

    private Gamepad processBool(String name, boolean val, Gamepad gamepad) {
        switch (name) {
            case "A":
                gamepad.a = val;
                break;

            case "B":
                gamepad.b = val;
                break;

            case "X":
                gamepad.x = val;
                break;

            case "Y":
                gamepad.y = val;
                break;

            case "leftBumper":
                gamepad.left_bumper = val;
                break;

            case "rightBumper":
                gamepad.right_bumper = val;
                break;

            case "leftTrigger":
                gamepad.left_trigger = val ? 1 : 0;
                break;

            case "rightTrigger":
                gamepad.right_trigger = val ? 1 : 0;
                break;

            case "dpadUp":
                gamepad.dpad_up = val;
                break;

            case "dpadDown":
                gamepad.dpad_down = val;
                break;

            case "dpadLeft":
                gamepad.dpad_left = val;
                break;

            case "dpadRight":
                gamepad.dpad_right = val;
                break;
        }
        return gamepad;
    }

    private Gamepad processValue(String name, float val, Gamepad gamepad) {
        switch (name) {
            case "leftX":
                gamepad.left_stick_x = val;
                break;

            case "leftY":
                gamepad.left_stick_y = val;
                break;

            case "rightX":
                gamepad.right_stick_x = val;
                break;

            case "rightY":
                gamepad.right_stick_y = val;
                break;
        }
        return gamepad;
    }
}
