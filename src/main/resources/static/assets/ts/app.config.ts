namespace fishing.log {
     'use strict';

     class Config {
         constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider){

             $urlRouterProvider.otherwise("/overview.html");

             $stateProvider
                .state("overview", {
                    url: "/overview.html",
                    template: "<overview-component></overview-component>"
                })
                .state("fishing", {
                    url: "/fishing.html",
                    template: "<fishing-component></fishing-component>"
                })
                .state("fishingday", {
                    url: "/fishingday.html",
                    template: "<fishingday-component></fishingday-component>"
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