namespace fishing.log{
    'use strict'; 

    class SessionsController{
        
        static $inject = ["$http"];

        sessionsDays: ISessionsDay[];
        loading: boolean = true;

        constructor(private $http: ng.IHttpService){
            
        }

        $onInit(){
            this.sessionsDays = [];
            this.getMySessions();
        }

        private getMySessions(){
            this.loading = true;
            this.$http.get("api/sessions").then(result => {
                this.sessionsDays = <ISessionsDay[]> result.data;
                this.loading = false;
            });
        }

    }

    angular.module("fishingLog").component("sessionsComponent", {
        templateUrl: "sessions.html",
        controller: SessionsController,
        controllerAs: "vm"
    });

}