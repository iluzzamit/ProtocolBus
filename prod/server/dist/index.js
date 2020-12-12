"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const CANBus_1 = require("./ctrl/CANBus");
const CANBusDetector_1 = require("./bl/CANBusDetector");
const CANBusGenerator_1 = require("./bl/CANBusGenerator");
const CANReporter_1 = require("./bl/CANReporter");
const CANBusRouter_1 = require("./route/CANBusRouter");
const Logger_1 = require("./bl/Logger");
const cors = require("cors");
const Log_1 = require("./model/Log");
const events_1 = require("events");
const path = require("path");
const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.info(`Server initialized and listening on port 8080.`);
    console.info(`Please make sure you visit http://localhost:8080/ to watch the reporter results.`);
});
app.use(cors());
const canBusGenerator = new CANBusGenerator_1.default();
const canBusDetector = new CANBusDetector_1.default();
const canBusReporter = new CANReporter_1.CANBusReporter();
const canBusEmitter = new events_1.EventEmitter();
const canBusLogger = new Logger_1.Logger();
const canBus = new CANBus_1.default(canBusGenerator, canBusDetector, canBusReporter, canBusLogger, canBusEmitter);
CANBusRouter_1.initialCANBusRouter(app, canBus);
app.use((express.static(path.join(__dirname, "/../../client/build"))));
const io = require('socket.io')(server, { cors: { origin: '*', } });
io.on('connection', (socket) => {
    canBusLogger.add(new Log_1.Log(Log_1.Events.userConnected));
    canBusEmitter.on('message', () => {
        const data = canBus.getReporterData();
        socket.emit('message', data);
    });
    canBusEmitter.on('log', () => {
        const logs = canBus.getLogs();
        socket.emit('log', logs);
    });
});
//# sourceMappingURL=index.js.map