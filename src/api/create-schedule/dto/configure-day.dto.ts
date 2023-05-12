
class ConfigureDayDto {
    startHour!: number
    endHour!: number
    interval!: {
        hour: number
        min: number
    }
    current_date!: string
}