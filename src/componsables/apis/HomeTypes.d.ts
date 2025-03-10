export namespace HomeTypes {
    export interface HomeStatsInfoCardType {
        label: string;

        value: string;

        isShow: boolean;
    }


    export interface DailyAccessStatsType {
        date: string;

        pv: number;

        uv: number;

        uip: number;
    }
}
