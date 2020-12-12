import { Router } from "express";
import CANBus from "../ctrl/CANBus";
import { Events, Log } from "../model/Log";

/*
    2 API Routes,
        [get] api/can-bus gets last 100 messages.
        [put] api/can-bus/toggle-generator toggle the generator.
*/

export function initialCANBusRouter(app, canBus: CANBus) {
    const canBusRouter = Router();
    app.use(canBusRouter);

    canBusRouter.get('/api/can-bus/', (req, res) => {
        try {
            const data = canBus.getReporterData().slice(0,100);

            res.status(200).send(data);
        } catch (e) {
            const log: Log = new Log(Events.failedToGetDataAPI, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });

    canBusRouter.get('/api/can-bus/is-generating', (req, res) => {
        try {
            const data = canBus.isGenerating();

            res.status(200).send(data);
        } catch (e) {
            const log: Log = new Log(Events.failedToGetDataAPI, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });

    canBusRouter.get('/api/can-bus/get-logs', (req, res) => {
        try {
            const data = canBus.getLogs().slice(0,100);

            res.status(200).send(data);
        } catch (e) {
            const log: Log = new Log(Events.failedToGetLogs, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });

    canBusRouter.put('/api/can-bus/toggle-generator', (req, res) => {
        try{
            const result = canBus.isGenerating();
            result ? canBus.stopGenerator() : canBus.startGenerator();

            res.status(200).send();
        }catch(e) {
            const log: Log = new Log(Events.failedToToggleGeneratorAPI, e);
            canBus.logger.add(log);
            console.log(log);
            res.status(400).send(log);
        }
    });
}