import { DateTimeFormatOptions } from 'intl';

export const formattedDate = (date: string) => {
    const dateConvert = new Date(date);

    const options: DateTimeFormatOptions = { day: "numeric", month: "short" };
    const [month, day] = dateConvert.toLocaleDateString("en-DE", options).split(' ');

    return { day, month }
}; 