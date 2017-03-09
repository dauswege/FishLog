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

    interface ISessionSaveDTO{
        id: number;
        startTime: string;
        endTime: string;
        fishDay: {
            id: number,
            day: string
        }
    }

    class SessionController{

        static $inject = ["$http", "$filter","$state"];

        session: ISession;

        constructor(private $http: ng.IHttpService, 
                    private $filter: ng.IFilterService, 
                    private $state: angular.ui.IStateService){

        }

        $onInit(){

            var startTime = new Date();
            startTime.setMilliseconds(0);
            startTime.setSeconds(0);

            this.session = <ISession>{
                startTime: startTime,
                fishDay: {day: new Date()}
            };
        }

        public saveSession(){
            var sessionToSave = <ISessionSaveDTO> {
                id: this.session.id,
                startTime: this.getTimeString(this.session.startTime),
                endTime: this.getTimeString(this.session.endTime),
                fishDay: {
                    id: this.session.fishDay.id,
                    day: this.getDateString(this.session.fishDay.day)
                }
            };
            this.$http.post("api/sessions", sessionToSave).then(result => {

            });
        }

        private getDateString(tmp: Date){
            return this.$filter('date')(tmp, 'yyyy-MM-dd');
        }

        private getTimeString(tmp: Date){
            return this.$filter('date')(tmp, 'HH:mm:ss');
        }

    }

    angular.module("fishingLog").component("sessionComponent", {
        controller: SessionController,
        controllerAs: "vm",
        templateUrl: "session.html"
    });
}