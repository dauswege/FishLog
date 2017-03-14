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
                    url: "/sessions/{sessionId}/fishings",
                    template: "<fishing-component></fishing-component>",
                    component: "fishing"
                })
                .state("fishing.table", {
                    template: "<fishings-table-component></fishings-table-component>",
                    parent: "fishing"
                })
                .state("fishingday", {
                    url: "/fishingday",
                    template: "<fishingday-component></fishingday-component>"
                })
                .state("sessions", {
                    url: "/sessions",
                    template: "<sessions-component></sessions-component>"
                })
                .state("session", {
                    url: "/session/{sessionId}",
                    template: "<session-component></session-component>"
                })
                .state("session.fishingstable", {
                    template: "<fishings-table-component></fishings-table-component>",
                    parent: "session"
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