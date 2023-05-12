
export function transformStringToDate(current_date: string) {
    const [day, month, year] = current_date.split('.');
    const currentDate = new Date(`${year}-${month}-${day}`);
    return currentDate;
}

export function transformDateToString(currentDate:Date){
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
}