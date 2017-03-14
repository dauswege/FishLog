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

    class FishingsTableController{

        static $inject = ['$http', '$filter', '$state'];

        fishing: any = <Fishing>{};
        fishings: Fishing[];
        // fishingDate: Date;
        toggleDetailsContainer: Fishing[];
        sessionId: number;
        
        constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService, private $state: angular.ui.IStateService){
            
        }

        $onInit(){ 

            this.sessionId = this.$state.params["sessionId"];           
            this.toggleDetailsContainer = [];
            this.getFishings();
        }


        public onEditFishing(fishing){
            // this.editMode = true;
            // this.fishing = fishing;
            console.log("on edit clicked");
        }

        public deleteFishing(fishingToDelete: Fishing){

            this.$http.delete("api/fishings/" + fishingToDelete.id).then(result => {
                this.getFishings();
                
            })

        }


        public toggleDetails(fishing: Fishing){
            var idx = this.toggleDetailsContainer.indexOf(fishing);
            if(idx<0){
                this.toggleDetailsContainer.push(fishing);
                this.onEditFishing(fishing);
            } else {
                this.toggleDetailsContainer.splice(idx, 1);
                // this.resetFishing();
            }
        }

        public showDetails(fishing: Fishing){
            return !(this.toggleDetailsContainer.indexOf(fishing)<0);
        }

        public getIconUrl(iconId: string){
            return "http://openweathermap.org/img/w/" + iconId + ".png";
        }

        private getFishings(){
            this.$http.get("api/sessions/" + this.sessionId + '/fishings')
            .then(result => {this.fishings = <Fishing[]>result.data});
        }
    
    }

    angular.module('fishingLog').component('fishingsTableComponent',{
        templateUrl: "fishingstable.html",
        controller: FishingsTableController,
        controllerAs: "vm"
    } 
    );

}