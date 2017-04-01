namespace fishing.log{
    'use strict';

    interface Fishing{
        
        id: number;
        fish: string;
        length: number; 
        weight: number;
        comment: string;
        fishingTime: string;
        
    }

    class FishingController{

        static $inject = ['$http', '$filter', '$state'];

        fishes: Array<String>;
        fishing: any = <Fishing>{};
        fishings: Fishing[];
        fishingTime: Date;
        toggleDetailsContainer: Fishing[];
        sessionId: number;
        fishingId: number;

        editMode: boolean;
        loadingCnt: number = 0;
        createWeather: boolean = true;
        
        constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService, private $state: angular.ui.IStateService){
            
        }

        $onInit(){ 
            
            this.sessionId = this.$state.params["sessionId"];
            if(this.$state.params["fishingId"] !== undefined && this.$state.params["fishingId"] != ""){
                this.fishingId = this.$state.params["fishingId"];
            }
            
            this.getAvailableFishes();

            this.fishingTime = new Date();
            this.fishingTime.setSeconds(0);
            this.fishingTime.setMilliseconds(0);

            this.toggleDetailsContainer = [];

            this.editMode = false;

            if(this.fishingId != undefined){
                this.getFishing(this.fishingId);
            }

        }

        public addFishing(){

            this.loadingCnt++;

            this.fishing.fishingTime = this.getTimeString(this.fishingTime);

            this.$http.post("api/sessions/" + this.sessionId +'/fishings?createWeather=' + this.createWeather, this.fishing)
            .then(result => {
                // this.getFishings();
                this.editMode = false;
                this.refreshFishings();
                this.loadingCnt--;
            });   

        }

        public onEditFishing(fishing){
            this.editMode = true;
            this.fishing = fishing;
        }

        public deleteFishing(fishingToDelete: Fishing){
            this.loadingCnt++;
            this.$http.delete("api/fishings/" + fishingToDelete.id).then(result => {
                this.resetFishing();
                // this.getFishings();
                this.loadingCnt--;
            });

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


        private refreshFishings(){
            this.$state.transitionTo("fishing.table", {sessionId: this.sessionId}, true);
        }

        private getAvailableFishes(){
            this.loadingCnt++;
            this.$http.get("api/constants/fishes").then(result => {
                this.fishes = <Array<String>> result.data;
                this.fishing.fish = this.fishes[0];
                this.loadingCnt--;
            });
        }

        private getFishing(fishingId: number){
            this.loadingCnt++;
            this.$http.get("api/fishings/" + fishingId)
            .then(result => {
                this.fishing = result.data;
                this.loadingCnt--;
            });
        }

        // private getFishings(){
        //     this.$http.get("api/sessions/" + this.sessionId + '/fishings')
        //     .then(result => {this.fishings = <Fishing[]>result.data});
        // }

        private getDateString(tmp: Date){
            return this.$filter('date')(tmp, 'yyyy-MM-dd');
        }

        private getTimeString(tmp: Date){
            return this.$filter('date')(tmp, 'HH:mm:ss');
        }
    
    }

    // angular.module('fishingLog').controller('FishingController', FishingController);
    angular.module('fishingLog').component('fishingComponent',{
        templateUrl: "fishing.html",
        controller: FishingController,
        controllerAs: "vm"
    } 
    );

}