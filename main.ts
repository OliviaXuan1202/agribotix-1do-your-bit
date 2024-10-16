function motor () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, speed)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, speed)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Backward, speed)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Forward, speed)
}
function motor_2 () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, speed)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, speed)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Backward, speed)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Forward, speed)
}
let huminity = 0
let Temperature = 0
let moisture = 0
let speed = 0
esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
if (esp8266.isESP8266Initialized()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
esp8266.connectWiFi("@1234", "GOOD")
if (esp8266.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
} else {
    basic.showIcon(IconNames.Sad)
}
while (input.buttonIsPressed(Button.A)) {
    motor()
}
speed = 100
loops.everyInterval(1000, function () {
    motionbit.brakeMotor(MotionBitMotorChannel.M1)
    motionbit.brakeMotor(MotionBitMotorChannel.M2)
    motionbit.brakeMotor(MotionBitMotorChannel.M3)
    motionbit.brakeMotor(MotionBitMotorChannel.M4)
    moisture = pins.analogReadPin(pins.digitalReadPin(DigitalPin.P1))
    servos.P0.setRange(0, 60)
    servos.P0.setRange(60, 0)
    if (moisture > 1000) {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `)
    } else if ((0 as any) < (1000 as any)) {
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    }
})
loops.everyInterval(2000, function () {
    motionbit.brakeMotor(MotionBitMotorChannel.M1)
    motionbit.brakeMotor(MotionBitMotorChannel.M2)
    motionbit.brakeMotor(MotionBitMotorChannel.M3)
    motionbit.brakeMotor(MotionBitMotorChannel.M4)
    moisture = pins.analogReadPin(pins.digitalReadPin(DigitalPin.P1))
    servos.P0.setRange(0, 60)
    servos.P0.setRange(60, 0)
    if (moisture > 1000) {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `)
    } else if ((0 as any) < (1000 as any)) {
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    }
    basic.pause(1000)
})
basic.forever(function () {
    let Temperature_1 = 0
    motor_2()
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P1,
    false,
    false,
    true
    )
    Temperature = dht11_dht22.readData(dataType.temperature)
    huminity = dht11_dht22.readData(dataType.humidity)
    basic.pause(1000)
    basic.showString("" + (Temperature))
    basic.pause(1000)
    basic.showString("" + (huminity))
    motor()
    motor_2()
    esp8266.uploadThingspeak(
    "1RLKF92UTSJ9NXUI",
    Temperature,
    huminity,
    moisture
    )
})
