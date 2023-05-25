import { Request, Response } from "express";
import scheduleService from './schedule.service'
import { NotFoundException } from "@nestjs/common";



export default {

    async findAll(req: Request, res: Response) {
       // console.log('query',req.query)
        try {
            const week_data: DayInterface[] = await scheduleService.getData(req.query)
            res.render('main.hbs', week_data)
        } catch (err) {
            console.log(new NotFoundException(`some problem with db`)) 
       }

    },

    async addEvent(req: Request, res: Response) {
        try {
            const result = await scheduleService.addEvent(req.body)
            res.json(result);
        } catch (err) {
            return new NotFoundException(`don't find evend on this time=>${err}`);
           // console.log(new NotFoundException(`some problem with db`)) 
        }
    },

    async deleteEvent(req: Request, res: Response) {
        try {
            scheduleService.deleteEvent(req.body)
            res.json({ ok: true })
        } catch (err) {
            return new NotFoundException(`don't find evend on this time=>${err}`);
        }
    },

    async configureDay(req: Request, res: Response) {
        await scheduleService.configureDayAndSaveToDB(req.body)
        res.json({ ok: true })
    },


}