import CANBusDetector from "../src/bl/CANBusDetector";
import CANBusGenerator from "../src/bl/CANBusGenerator";
import { CANBusReporter } from "../src/bl/CANReporter";
import { EventEmitter } from "events";
import { Logger } from "../src/bl/Logger";
import CANBus from "../src/ctrl/CANBus";

const canBusGenerator = new CANBusGenerator()
const canBusDetector = new CANBusDetector();
const canBusReporter = new CANBusReporter();
const canBusEmitter = new EventEmitter();
const canBusLogger = new Logger();

const canBus = new CANBus(canBusGenerator, canBusDetector, canBusReporter, canBusLogger, canBusEmitter);


test("CANBus: has all members", () => {
    expect(canBus.generator).toBe(canBusGenerator);
    expect(canBus.detector).toBe(canBusDetector);
    expect(canBus.reporter).toBe(canBusReporter);
    expect(canBus.emitter).toBe(canBusEmitter);
    expect(canBus.logger).toBe(canBusLogger);
})

test("CANBus: when generate traffic", () => {
    canBus.startGenerator();
    canBus.stopGenerator();
    expect(!canBus.getReporterData()).toBeInstanceOf(Array);
})

test("CANBus: when generate traffic", () => {
    canBus.startGenerator();
    canBus.stopGenerator();
    expect(canBus.getReporterData().length > 0).toBeTruthy();
})

