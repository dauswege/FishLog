namespace fishing.log{
    'use strict';

    class OverviewController{
        constructor(){

        }
    }

    angular.module("fishingLog").component("overviewComponent", {
        bindings: {
        },
        templateUrl: 'overview.html',
        controller: OverviewController,
        controllerAs: 'vm'
    });

}