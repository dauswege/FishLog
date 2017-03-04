namespace fishing.log{
    'use strict';

    interface Fishing{
        
        id: number;
        fish: string;
        length: number; 
        weight: number;
        comment: string;
        fishingTime: string;
        // constructor(fish: string, length: number, weight: number, fishingTime: string);
        
    }

    class FishingController{

        static $inject = ['$http', '$filter', '$state'];

        fishes: Array<String>;
        fishing: any = <Fishing>{};
        fishings: Fishing[];
        fishingTime: Date;
        fishingDate: Date;
        toggleDetailsContainer: Fishing[];

        editMode: boolean;
        
        constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService, private $state: angular.ui.IStateParamsService){
            
        }

        $onInit(){ 
            if(this.$state.params.date !== undefined && this.$state.params.date.toString() !== ""){
                // this.fishingDate = this.$state.params.date;
               this.fishingDate = new Date(this.$state.params.date);
            } else{
                this.fishingDate = new Date();
            }
            this.fishingTime = new Date();
            this.fishingTime.setSeconds(0);
            this.fishingTime.setMilliseconds(0);
            
           
            this.toggleDetailsContainer = [];

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
                this.resetFishing();
                this.getFishings();
                
            })

        }

        public resetFishing(){
            this.fishing = {};
            this.fishing.fish = this.fishes[0];
            this.editMode = false;
        }

        public toggleDetails(fishing: Fishing){
            var idx = this.toggleDetailsContainer.indexOf(fishing);
            if(idx<0){
                this.toggleDetailsContainer.push(fishing);
                this.onEditFishing(fishing);
            } else {
                this.toggleDetailsContainer.splice(idx, 1);
                this.resetFishing();
            }
        }

        public showDetails(fishing: Fishing){
            return !(this.toggleDetailsContainer.indexOf(fishing)<0);
        }

        public getIconUrl(iconId: string){
            return "http://openweathermap.org/img/w/" + iconId + ".png";
        }

        public dateChanged(){
            this.toggleDetailsContainer = [];

            this.getAvailableFishes();
            this.getFishings();
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