import { Request, Response } from "express";
import scheduleService from './schedule.service'
import { NotFoundException } from "@nestjs/common";



export default {

    async findAll(_: any, res: Response) {
        const week_data: DayInterface[] = await scheduleService.getDataFromDB()
        // console.log("==length=>",week_data.length)
        console.log("===>", week_data)
        res.render('main.hbs', week_data)
    },
    async addEvent(req: Request, res: Response) {
        // console.log(" add event = >", req.body)
        try {
            const result = await scheduleService.addEvent(req.body)
            res.json(result);
        } catch (err) {
            return new NotFoundException(`don't find evend on this time=>${err}`);
        }


    },
    async deleteEvent(req: Request, res: Response) {
        console.log(" delete event = >", req.body)
        try {
            scheduleService.deleteEvent(req.body)
            res.json({ ok: true })
        } catch (err) {
            return new NotFoundException(`don't find evend on this time=>${err}`);
        }
    },

    async configureDay(req: Request, res: Response) {
        await scheduleService.configureDayAndSaveToDB(req)
        res.json({ ok: true })
    },




}