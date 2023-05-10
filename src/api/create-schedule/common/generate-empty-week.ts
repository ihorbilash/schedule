

export function generateEmptyWeek(current_date: Date) {

    let dataObject: DayInterface[] = [];
    for (let i = 0; i < 7; i++) {
        let new_date = new Date(current_date.getTime() + ((i * 24 * 60 * 60 * 1000)));
        let newDayString = new_date.toLocaleDateString();
        const weekDayNumber: number = new_date.getDay();

        const dayData: DayInterface = {
            data: newDayString,
            week_day: dayMapping[weekDayNumber] as string,
            availability: false
        }
        dataObject.push(dayData)
    }
    // console.log('=>', dataObject)
    return dataObject;
}


export function generateWeekDay(data: Date) {
    const weekDayNumber: number = data.getDay();
    const weekDayString = dayMapping[weekDayNumber] as string;
    return weekDayString
}

const dayMapping: Record<number, String> = {
    0: 'Неділя',
    1: 'Понеділок',
    2: 'Вівторок',
    3: 'Середа',
    4: 'Четвер',
    5: 'Пятниця',
    6: 'Субота'
};

