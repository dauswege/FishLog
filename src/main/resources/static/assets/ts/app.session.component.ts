namespace fishing.log{
    'use strict';

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

            if(this.$state.params.sessionId != undefined && this.$state.params.sessionId != ""){
                var sessionId = this.$state.params.sessionId;
                this.getSession(sessionId);
            } else {
                this.session = <ISession>{
                    startTime: startTime,
                    fishDay: {day: new Date()}
                };
            }
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

        private getSession(sessionId){
            this.$http.get("api/sessions/" + sessionId).then(result => {
                var tmp = <ISession> result.data;
                this.session = {
                    id: tmp.id,
                    startTime: undefined,
                    endTime: undefined,
                    fishDay: {
                        id: tmp.fishDay.id,
                        day: new Date(tmp.fishDay.day)
                    }
                };
                
                if(tmp.startTime != undefined){
                    this.session.startTime = new Date();
                    var timeValues: string[] = (<string>tmp.startTime).split(":");
                    this.session.startTime.setHours(timeValues[0]);
                    this.session.startTime.setMinutes(timeValues[1]);
                    this.session.startTime.setSeconds(timeValues[2]);
                    this.session.startTime.setMilliseconds(0);
                }
                
                if(tmp.endTime != undefined){
                    this.session.endTime = new Date();
                    var timeValues: string[] = (<string>tmp.endTime).split(":");
                    this.session.endTime.setHours(timeValues[0]);
                    this.session.endTime.setMinutes(timeValues[1]);
                    this.session.endTime.setSeconds(timeValues[2]);
                    this.session.endTime.setMilliseconds(0);
                }

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