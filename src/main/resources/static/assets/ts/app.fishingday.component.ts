namespace fishing.log{
    'use strict';

    class FishingDayController{

        static $inject = ['$http', '$filter'];

        fishingDay: any;
        fishingDays: any[];
        editMode: boolean;
        
        constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService){
            
        }

        $onInit(){

        }

        private getFishingDay(fishingDayDate: Date){
            this.$http.get("api/fishingDays/" + this.getDateString(fishingDayDate))
            .then(result => {
                this.fishingDay = result.data;
            });
        }

        private getFishingDays(){
            this.$http.get("api/fishingDays") .then(
                result => {
                    this.fishingDays = <any[]> result.data;
                }
            );
        }

        private getDateString(tmp: Date){
            return this.$filter('date')(tmp, 'yyyy-MM-dd');
        }

    }

    angular.module('fishingLog')
    .component('fishingdayComponent',{
        templateUrl: "fishingday.html",
        controller: FishingDayController,
        controllerAs: "vm"
    });
}