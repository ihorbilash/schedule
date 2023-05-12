const COUNT_DAYS = 7;

export function generateEmptyWeek(current_date: string) {

    let dataObject: DayInterface[] = [];
    for (let i = 0; i < COUNT_DAYS; i++) {
        let new_date = new Date(new Date(current_date).getTime() + ((i * 24 * 60 * 60 * 1000)));
        let newDayString = new_date.toLocaleDateString();
        const weekDayNumber: number = new_date.getDay();

        const dayData: DayInterface = {
            date: newDayString,
            week_day: dayMapping[weekDayNumber] as string,
            availability: false
        }
        dataObject.push(dayData)
    }
    return dataObject;
}


export function generateWeekDay(data: Date) {
    const weekDayNumber: number = data.getDay();
    const weekDayString = dayMapping[weekDayNumber] as string;
    return weekDayString
}

const dayMapping: Record<number, String> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};

