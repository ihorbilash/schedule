
interface DayInterface {
    free_date?: FreeDateInterface[]
    date: string;
    week_day: string;
    availability: boolean;
}

interface FreeDateInterface {
    time?: string
    date: Date
    event?: string
    busy: boolean;
}

type MyWeek = 'Понеділок' | 'Вівторок' | 'Середа' | 'Четверг' | 'Пятниця' | 'Субота' | 'Неділя' 