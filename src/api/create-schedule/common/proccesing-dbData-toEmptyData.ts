import { Day } from "../../entity/day.entity";
import { FreeDate } from "../../entity/free-date.entity";
import { transformStringToDate } from "./transform-format";


export function processingData(data: Day[], emtyWeek: DayInterface[]) {
    const newDate: DayInterface[] = emtyWeek.map(el => {
        const current_date = transformStringToDate(el.date)
        const foundDay = data.find(day => day.date.getTime() === new Date(current_date).getTime())
        if (foundDay) {
            if (foundDay.freeDates.length !== 0) {
                el.free_date = processingFreeTime(foundDay.freeDates);
            }
        }
        return el;
    })
    return newDate;
}

function processingFreeTime(freeDate: FreeDate[]) {
    return freeDate.map(el => {
        let obj: FreeDateInterface = {
            time: ` ${el.date.getHours().toString()}:
            ${el.date.getMinutes().toString() === '0' ? '00' : el.date.getMinutes().toString()}`,
            busy: el.busy,
            event: el.event ? el.event : 'empty yet',
            date: el.date
        }
        return obj;
    })
}


