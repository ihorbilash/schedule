

/*interface DataInterface {
    [key: string]: DayInterface;

}*/

interface DayInterface {
    free_date?: FreeDateInterface[]
    data: string;
    week_day:string;
    availability:boolean;
}

interface FreeDateInterface {
    time?: string
    date: Date
    event?: string
    busy:boolean;
}

type MyWeek = 'Понеділок' | 'Вівторок' | 'Середа' | 'Четверг' | 'Пятниця' | 'Субота' | 'Неділя' 