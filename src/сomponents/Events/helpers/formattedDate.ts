import { DateTimeFormatOptions } from 'intl';

export const currentDate = () => new Date().toISOString().slice(0, 10);

export const formattedDate = (date: string) => {
    const dateConvert = new Date(date);

    const options: DateTimeFormatOptions = { day: "numeric", month: "short" };
    const [month, day] = dateConvert.toLocaleDateString("en-DE", options).split(' ');

    return { day, month }
};

export const formatDate = (inputDate: string | undefined) => {
    const months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    if (inputDate !== undefined) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }
    return null

}

