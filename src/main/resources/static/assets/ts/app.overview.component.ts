namespace fishing.log{
    'use strict';

    class OverviewController{

        static $inject = ["$http", "$filter"];

        session: ISession;

        constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService){

        }

        $onInit(){
            this.getActiveSession();
        }

        private getActiveSession(){
            this.$http.get("api/sessions/active/" + this.getDateString(new Date())).then(result => {
                this.session = <ISession> result.data;
            });
        }

        private getDateString(tmp: Date){
            return this.$filter('date')(tmp, 'yyyy-MM-dd');
        }

        private getTimeString(tmp: Date){
            return this.$filter('date')(tmp, 'HH:mm:ss');
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