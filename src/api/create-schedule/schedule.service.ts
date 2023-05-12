import { Request } from "express";
import { myDataSource } from "../../config/app-data-source";
import { Day } from "../entity/day.entity";
import { generateEmptyWeek } from "./common/generate-empty-week";
import generateDaySchedule from "./common/generate-day-schedule";
import { processingData } from "./common/proccesing-dbData-toEmptyData";
import { FreeDate } from "../entity/free-date.entity";
import { AddEventDto } from "./dto/add-event.dto";
import { NotFoundException } from "@nestjs/common";
import { transformDateToString } from "./common/transform-format";



export default {
    //  const dayRepository = myDataSource.getRepository(Day);
    //   const freeDateRepository = myDataSource.getRepository(FreeDate);

    async getData(dto: GetRulesDto) {

        let data: Day[] = await this.getFromDbAndUseRule(dto.rule)
        const formattedDate = transformDateToString(new Date());
        const emtyWeek = generateEmptyWeek(formattedDate);
        const week_data = processingData(data, emtyWeek);
        return week_data;
    },

    async configureDayAndSaveToDB(body: ConfigureDayDto) {
        await generateDaySchedule(body);
    },

    async addEvent(body: AddEventDto): Promise<NotFoundException | { ok: true; }> {
        const freeDateRepository = myDataSource.getRepository(FreeDate);
        let currentEvent = await freeDateRepository.findOneBy({ date: new Date(body.date) });
        if (currentEvent === null) {
            return new NotFoundException(`Not found current date where date=${body.date}`)
        }
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
    },

    async getFromDbAndUseRule(rule: string | undefined) {
        const dayRepository = myDataSource.getRepository(Day);
        let data = await dayRepository.find({
            relations: { freeDates: true }
        });
        if (rule === 'busy') {
            return data.map(item => {
                item.freeDates = item.freeDates.filter(el => el.busy === true);
                return item;
            });
        } else if (rule === 'free') {
            return data.map(item => {
                item.freeDates = item.freeDates.filter(el => el.busy === false);
                return item;
            });
        } else {
            return data;
        }

    }


}