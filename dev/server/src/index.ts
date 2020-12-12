import * as express from "express";
import CANBus from "./ctrl/CANBus";
import CANBusDetector from "./bl/CANBusDetector";
import CANBusGenerator from "./bl/CANBusGenerator";
import { CANBusReporter } from "./bl/CANReporter";
import { initialCANBusRouter } from "./route/CANBusRouter";
import { Logger } from "./bl/Logger";
import * as cors from 'cors';
import { Events, Log } from "./model/Log";
import { EventEmitter } from "events";
import path = require("path");

/* tslint:disable */

const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.info(`Server initialized and listening on port 8080.`);
  console.info(`Please make sure you visit http://localhost:8080/ to watch the reporter results.`);
});

app.use(cors());

const canBusGenerator = new CANBusGenerator()
const canBusDetector = new CANBusDetector();
const canBusReporter = new CANBusReporter();
const canBusEmitter = new EventEmitter();
const canBusLogger = new Logger();

const canBus = new CANBus(canBusGenerator, canBusDetector, canBusReporter, canBusLogger, canBusEmitter);

initialCANBusRouter(app, canBus);
app.use((express.static(path.join(__dirname, "/../../client/build"))));

const io = require('socket.io')(server, {cors: {origin: '*',}});
io.on('connection', (socket) => {
  canBusLogger.add(new Log(Events.userConnected));

  canBusEmitter.on('message', () => {
    const data = canBus.getReporterData();
    socket.emit('message', data);
  });

  canBusEmitter.on('log', () => {
    const logs = canBus.getLogs();
    socket.emit('log', logs);
  })
});

