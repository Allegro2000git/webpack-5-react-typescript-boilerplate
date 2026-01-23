import dayjs from "dayjs";
import 'dayjs/locale/ru';

export const useDateFormat = () => {
    const format = (date: string | Date, format = 'DD.MM.YYYY') => {
        return dayjs(date).locale('ru').format(format);
    };
    return { format };
};