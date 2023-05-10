import { Request } from "express";
import { myDataSource } from "../../config/app-data-source";
import { Day } from "../entity/day.entity";
import { generateEmptyWeek } from "./common/generate-empty-week";
import generateDaySchedule from "./common/generate-day-schedule";
import { processingData } from "./common/proccesing-dbData-toEmptyData";
import { FreeDate } from "../entity/free-date.entity";
import { AddEventDto } from "./dto/add-event.dto";
import { NotFoundException } from "@nestjs/common";



export default {
    //  const dayRepository = myDataSource.getRepository(Day);
    //   const freeDateRepository = myDataSource.getRepository(FreeDate);


    async configureDayAndSaveToDB(req: Request) {
        const { startHour, endHour, interval, current_date } = req.body
        //  console.log("conf data=>", startHour, " ", endHour, " ", interval, " ", current_date)
        await generateDaySchedule(startHour, endHour, interval, current_date);
    },
    async getDataFromDB() {
        const dayRepository = myDataSource.getRepository(Day);
        let data = await dayRepository.find({
            relations: {
                freeDates: true
            }
        });
        const current_date = new Date();
        let emtyWeek = generateEmptyWeek(current_date)
        let week_data = processingData(data, emtyWeek)
        //  console.log('data from db=>', week_data)
        return week_data;
    },

    async addEvent(body: AddEventDto): Promise<NotFoundException | { ok: true; }> {
        const freeDateRepository = myDataSource.getRepository(FreeDate);
        // console.log("шо я шукаю в БД=>",body.date,"   -",new Date(body.date))
        let currentEvent = await freeDateRepository.findOneBy({ date: new Date(body.date) });
        if (currentEvent === null) {
            return new NotFoundException(`Not found current date where date=${body.date}`)
        }
        // console.log("поверноув з бази=>",currentEvent)
        currentEvent.event = body.info;
        currentEvent.busy = true;
        await freeDateRepository.save(currentEvent);
        return ({ ok: true })
    },

    async deleteEvent(date: { date: Date }) {
        const freeDateRepository = myDataSource.getRepository(FreeDate);
        let currentEvent = await freeDateRepository.findOneBy({ date: new Date(date.date) });
        if (currentEvent === null) {
            return new NotFoundException(`Not found current date where date=${date.date}`)
        }
        currentEvent.busy = false;
        currentEvent.event = ''
        await freeDateRepository.save(currentEvent);
        return ({ ok: true })
    }


}