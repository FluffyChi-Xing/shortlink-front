import dayjs from "dayjs";
import {
    setWorkerTimeout,
    setWorkerInterval,
    clearWorkerTimer
} from 'set-worker-timer';

export function timerFormat(date: string, format: string): any {
    if (date !== undefined && date !== null) {
        let time: string;
        time = dayjs(date).format(format);
        if (time !== null) {
            return time;
        }
        return '无法处理的时间格式';
    }
}


/**
 * set-worker-timer 标准定时器
 * @param task
 * @param time
 */
export function workerTimeout<T>(task: T, time: number) {
    return setWorkerTimeout(() => task, time);
}


/**
 * set-worker-timer 标准定时器
 * @param task
 * @param time
 */
export function workerInterval<T>(task: T, time: number) {
    return setWorkerInterval(() => task, time);
}


/**
 * 清除定时器
 * @param timer
 */
// export function clearWorkerTimer<T>(timer: T) {
//     clearWorkerTimer(timer);
// }
