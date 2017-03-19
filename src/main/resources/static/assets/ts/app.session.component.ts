namespace fishing.log{
    'use strict';

    class SessionController{

        static $inject = ["$http", "$filter","$state"];

        session: ISession;
        loading: boolean = true;

        constructor(private $http: ng.IHttpService, 
                    private $filter: ng.IFilterService, 
                    private $state: angular.ui.IStateService){

        }

        $onInit(){

            var startTime = new Date();
            startTime.setMilliseconds(0);
            startTime.setSeconds(0);

            var sessionId: string = <string> this.$state.params["sessionId"];
            if(sessionId != undefined && sessionId != ""){
                this.getSession(sessionId);
                this.$state.transitionTo("session.fishingstable", {sessionId: sessionId});
            } else {
                this.session = <ISession>{
                    startTime: startTime,
                    fishDay: {day: new Date()}
                };
                this.loading = false;
            }
        }

        public getIconUrl(iconId: string){
            return "http://openweathermap.org/img/w/" + iconId + ".png";
        }

        public saveSession(){
            this.loading = true;
            var sessionToSave = <ISessionSaveDTO> {
                id: this.session.id,
                startTime: this.getTimeString(this.session.startTime),
                endTime: this.getTimeString(this.session.endTime),
                comment: this.session.comment,
                fishDay: {
                    id: this.session.fishDay.id,
                    day: this.getDateString(this.session.fishDay.day)
                }
            };
            this.$http.post("api/sessions", sessionToSave).then(result => {
                this.$state.go("session", {"sessionId": result.data});
                this.loading = false;
            });
        }

        public setEndTime(){
            var endTime = new Date();
            endTime.setMilliseconds(0);
            endTime.setSeconds(0);
            this.session.endTime = endTime;
        }

        public delete(){
            this.loading=true;
            this.$http.delete("api/sessions/" + this.session.id)
            .then(result => {
                this.$state.go("sessions");
                this.loading=false;
            })
            ;
        }

        public goBack(){
            this.$state.go("overview");
        }

        private getSession(sessionId){
            this.loading = true;
            this.$http.get("api/sessions/" + sessionId).then(result => {
                var tmp = <any> result.data;
                this.session = {
                    id: tmp.id,
                    startTime: undefined,
                    endTime: undefined,
                    comment: tmp.comment,
                    startWeather: tmp.startWeather,
                    fishDay: {
                        id: tmp.fishDay.id,
                        day: new Date(tmp.fishDay.day)
                    }
                };
                
                if(tmp.startTime != undefined){
                    this.session.startTime = new Date();
                    var timeValues: any[] = tmp.startTime.split(":");
                    this.session.startTime.setHours(timeValues[0]);
                    this.session.startTime.setMinutes(timeValues[1]);
                    this.session.startTime.setSeconds(timeValues[2]);
                    this.session.startTime.setMilliseconds(0);
                }
                
                if(tmp.endTime != undefined){
                    this.session.endTime = new Date();
                    var timeValues: any[] = tmp.endTime.split(":");
                    this.session.endTime.setHours(timeValues[0]);
                    this.session.endTime.setMinutes(timeValues[1]);
                    this.session.endTime.setSeconds(timeValues[2]);
                    this.session.endTime.setMilliseconds(0);
                }

                this.loading = false;

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