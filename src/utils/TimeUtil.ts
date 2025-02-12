import dayjs from "dayjs";

export function timerFormat(date: string, format: string): string {
    if (date !== undefined && date !== null) {
        let time: string = null;
        time = dayjs(date).format(format);
        if (time !== null) {
            return time;
        }
        return '无法处理的时间格式';
    }
}
