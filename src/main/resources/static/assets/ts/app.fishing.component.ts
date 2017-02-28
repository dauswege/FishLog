namespace fishing.log{
    'use strict';

    interface Fishing{
        
        id: number;
        fish: string;
        length: number; 
        weight: number;
        fishingTime: string;
        constructor(fish: string, length: number, weight: number, fishingTime: string);
        
    }

    class FishingController{

        static $inject = ['$http', '$filter'];

        fishes: Array<String>;
        fishing: any = <Fishing>{};
        fishings: Fishing[];
        fishingTime: Date;
        fishingDate: Date;

        editMode: boolean;
        
        constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService){
            
        }

        $onInit(){
            
            this.fishingTime = new Date();
            this.fishingTime.setSeconds(0);
            this.fishingTime.setMilliseconds(0);

            this.fishingDate = new Date();

            this.getAvailableFishes();
            this.getFishings();
            this.editMode = false;

        }

        public addFishing(){

            this.fishing.fishingTime = this.getTimeString(this.fishingTime);

            this.$http.post("api/fishdays/" +this.getDateString(this.fishingDate)+'/fishings', this.fishing)
            .then(result => {
                this.getFishings();
                this.editMode = false;
            });   

        }

        public onEditFishing(fishing){
            this.editMode = true;
            this.fishing = fishing;
        }

        public deleteFishing(fishingToDelete: Fishing){

            this.$http.delete("api/fishings/" + fishingToDelete.id).then(result => {
                this.getFishings();
                this.editMode = true;
            })

        }

        public resetFishing(){
            this.fishing = {};
            this.editMode = false;
        }

        private getAvailableFishes(){
            this.$http.get("api/constants/fishes").then(result => {
                this.fishes = <Array<String>> result.data;
                this.fishing.fish = this.fishes[0];
            });
        }

        private getFishings(){
            this.$http.get("api/fishdays/" + this.getDateString(this.fishingDate) + '/fishings')
            .then(result => {this.fishings = <Fishing[]>result.data});
        }

        private getDateString(tmp: Date){
            return this.$filter('date')(tmp, 'yyyy-MM-dd');
        }

        private getTimeString(tmp: Date){
            return this.$filter('date')(tmp, 'HH:mm:ss');
        }
    
    }

    // angular.module('fishingLog').controller('FishingController', FishingController);
    angular.module('fishingLog').component('fishingComponent',{
        bindings: {},
        templateUrl: "fishing.html",
        controller: FishingController,
        controllerAs: "vm"
    } 
    );

}