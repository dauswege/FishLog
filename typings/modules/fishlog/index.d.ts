declare namespace fishing.log {

    export interface ISession{
        id: number;
        startTime: Date;
        endTime: Date;
        comment: string;
        startWeather: {
            main: string,
            description: string,
            icon: string,
            temp: number,
            pressure: number,
            humidity: number,
            visibility: number,
            windSpeed: number,
            windDirection: string,
            cloudiness: number
        },
        fishDay: {
            id: number,
            day: Date
        }
    } 

     export interface ISessionSaveDTO{
        id: number;
        startTime: string;
        endTime: string;
        comment: string;
        fishDay: {
            id: number,
            day: string
        }
    }

    export  interface ISessionsDay{
        day: Date,
        sessions: ISession[]
    }

}