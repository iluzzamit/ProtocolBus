"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canBusEmitter = void 0;
const events_1 = require("events");
class CANBusEmitter {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    send(packet) {
        this.eventEmitter.emit('message', packet);
    }
    listen(callback) {
        this.eventEmitter.on('message', callback);
    }
}
exports.default = CANBusEmitter;
exports.canBusEmitter = new CANBusEmitter();
//# sourceMappingURL=Bus.js.map