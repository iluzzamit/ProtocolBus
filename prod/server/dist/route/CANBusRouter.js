"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialCANBusRouter = void 0;
const express_1 = require("express");
const Log_1 = require("../model/Log");
function initialCANBusRouter(app, canBus) {
    const canBusRouter = express_1.Router();
    app.use(canBusRouter);
    canBusRouter.get('/api/can-bus/', (req, res) => {
        try {
            const data = canBus.getReporterData().slice(0, 100);
            res.status(200).send(data);
        }
        catch (e) {
            const log = new Log_1.Log(Log_1.Events.failedToGetDataAPI, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });
    canBusRouter.get('/api/can-bus/is-generating', (req, res) => {
        try {
            const data = canBus.isGenerating();
            res.status(200).send(data);
        }
        catch (e) {
            const log = new Log_1.Log(Log_1.Events.failedToGetDataAPI, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });
    canBusRouter.get('/api/can-bus/get-logs', (req, res) => {
        try {
            const data = canBus.getLogs().slice(0, 100);
            res.status(200).send(data);
        }
        catch (e) {
            const log = new Log_1.Log(Log_1.Events.failedToGetLogs, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });
    canBusRouter.put('/api/can-bus/toggle-generator', (req, res) => {
        try {
            const result = canBus.isGenerating();
            result ? canBus.stopGenerator() : canBus.startGenerator();
            res.status(200).send();
        }
        catch (e) {
            const log = new Log_1.Log(Log_1.Events.failedToToggleGeneratorAPI, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });
}
exports.initialCANBusRouter = initialCANBusRouter;
//# sourceMappingURL=CANBusRouter.js.map