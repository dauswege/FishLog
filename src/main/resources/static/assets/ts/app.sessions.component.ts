namespace fishing.log{
    'use strict';

    interface ISession{        
        id: number;
        startTime: Date;
        endTime: Date;
        fishDay: {
            id: number,
            day: Date
        }
    }

    interface ISessionsDay{
        day: Date,
        sessions: ISession[]
    }

    class SessionsController{
        
        static $inject = ["$http"];

        sessionsDays: ISessionsDay[];

        constructor(private $http: ng.IHttpService){
            
        }

        $onInit(){
            this.sessionsDays = [];
            this.getMySessions();
        }

        private getMySessions(){
            this.$http.get("api/sessions").then(result => {
                this.sessionsDays = <ISessionsDay[]> result.data;
            });
        }

    }

    angular.module("fishingLog").component("sessionsComponent", {
        templateUrl: "sessions.html",
        controller: SessionsController,
        controllerAs: "vm"
    });

}