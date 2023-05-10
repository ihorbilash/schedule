import { myDataSource } from "../../../config/app-data-source";
import { Day } from "../../entity/day.entity";
import { FreeDate } from "../../entity/free-date.entity";

export default async function generateDaySchedule(startHour: number, endHour: number,
    interval: { hour: number, min: number }, current_date: string) {

    const dayRepository = myDataSource.getRepository(Day);
    const freeDateRepository = myDataSource.getRepository(FreeDate);
console.log("дата того дня где надо добавить ивенти=>",current_date)
    let newDay = new Day()
    let currentDate = new Date(current_date);
    const existDay = await dayRepository.findOneBy({ date: currentDate })
    if (existDay !== null) {
        newDay = existDay;
    }
    newDay.date = currentDate;
    await dayRepository.save(newDay)
    const startDate = new Date(current_date);
    startDate.setHours(startHour, 0, 0, 0); // Початковий час
    const endDate = new Date(current_date);
    endDate.setHours(endHour, 0, 0, 0); // Кінцевий час

    const general_interval = parseInt(interval.hour.toString(), 10) * 60 + parseInt(interval.min.toString(), 10); // Інтервал у хвилинах
    endDate.setMinutes(endDate.getMinutes() - general_interval)//set endDate minus current interval
    for (let currentTime = startDate; currentTime <= endDate; currentTime.setMinutes(currentTime.getMinutes() + general_interval)) {
        const freeDate = new FreeDate();
        freeDate.date = currentTime;
        freeDate.day = newDay;
        await freeDateRepository.save(freeDate);
    }


}




