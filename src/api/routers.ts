import express from "express";
import { scheduleRouter } from "./create-schedule/schedule.router";




export const restRouter = express.Router();
restRouter.use('/create-schedule', scheduleRouter);
//restRouter.use('/auth', authRouter);
