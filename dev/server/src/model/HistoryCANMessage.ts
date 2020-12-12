import { generate } from "shortid";
import { CANMessage } from "./CANMessage";

export class HistoryCANMessage {
    timestamp: number = new Date().getTime();
    uniqueId = generate();

    constructor(public canMessage: CANMessage) {};
}