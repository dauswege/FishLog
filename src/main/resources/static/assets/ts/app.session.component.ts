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
                this.session = <ISession> result.data;
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