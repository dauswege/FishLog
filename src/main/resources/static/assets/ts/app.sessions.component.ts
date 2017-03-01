namespace fishing.log{
    'use strict';


    class SessionsController{
        
        static $inject = ["$http"];

        fishingDays: any[];

        constructor(private $http: ng.IHttpService){
            
        }

        $onInit(){

            this.fishingDays = [];
            this.getFishingDays();
        }

        private getFishingDays(){
            this.$http.get("api/fishdays").then(result => {
                this.fishingDays = <any[]> result.data;
            })
        }

    }

    angular.module("fishingLog").component("sessionsComponent", {
        templateUrl: "sessions.html",
        controller: SessionsController,
        controllerAs: "vm"
    });

}