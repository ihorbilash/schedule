import { myDataSource } from "../../../config/app-data-source";
import { Day } from "../../entity/day.entity";
import { FreeDate } from "../../entity/free-date.entity";
import { transformStringToDate} from "./transform-format";

export default async function generateDaySchedule(dto: ConfigureDayDto) {
    const dayRepository = myDataSource.getRepository(Day);
    const freeDateRepository = myDataSource.getRepository(FreeDate);
    let newDay = new Day()
    const currentDate = transformStringToDate(dto.current_date);
    const existDay = await dayRepository.findOneBy({ date: currentDate })
    if (existDay !== null) { newDay = existDay; }
    newDay.date = currentDate;
    await dayRepository.save(newDay)
    const startDate = new Date(currentDate);
    startDate.setHours(dto.startHour, 0, 0, 0); // start time
    const endDate = new Date(currentDate);
    endDate.setHours(dto.endHour, 0, 0, 0); // end time
    const general_interval = parseInt(dto.interval.hour.toString(), 10) * 60 + parseInt(dto.interval.min.toString(), 10); // interval format min
    endDate.setMinutes(endDate.getMinutes() - general_interval)//set endDate minus current interval
    for (let currentTime = startDate; currentTime <= endDate; currentTime.setMinutes(currentTime.getMinutes() + general_interval)) {
        const freeDate = new FreeDate();
        freeDate.date = currentTime;
        freeDate.day = newDay;
        await freeDateRepository.save(freeDate);
    }

}




