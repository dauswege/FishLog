namespace fishing.log {
     'use strict';

     class Config {
         constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider){

             $urlRouterProvider.otherwise("/overview");

             $stateProvider
                .state("overview", {
                    url: "/overview",
                    template: "<overview-component></overview-component>"
                })
                .state("fishing", {
                    url: "/fishing/{date}",
                    template: "<fishing-component></fishing-component>"
                })
                .state("fishingday", {
                    url: "/fishingday",
                    template: "<fishingday-component></fishingday-component>"
                })
                .state("sessions", {
                    url: "/sessions",
                    template: "<sessions-component></sessions-component>"
                })
                ;

         }

     }

     angular.module('fishingLog')
     .config(['$stateProvider', '$urlRouterProvider', 
        ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) => { 
            return new Config($stateProvider, $urlRouterProvider); 
        }
    ]);

}